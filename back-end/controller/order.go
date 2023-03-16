package controller

import (
	"math"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateOrder(c *gin.Context) {

	type RequestBody struct {
		Address            model.Address `json:"address"`
		DeliveryProviderID uint          `json:"delivery_provider_id"`
		PaymentMethodID    uint          `json:"payment_method_id"`
		UserID             uint          `json:"user_id"`
		ItemsInCart        []model.Cart  `json:"items_in_cart"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	if requestBody.Address.ID == 0 {
		c.String(200, "Address Must be Chosen")
		return
	}

	// Validate Payment Only if Payment Method is Currency
	var user model.User
	config.DB.Model(model.User{}).Where("ID = ?", requestBody.UserID).First(&user)

	totalTransactionCost := 0.0
	length := len(requestBody.ItemsInCart)
	for i := 0; i < length; i++ {

		var product model.Product
		config.DB.Model(model.Product{}).Where("product_id = ?", requestBody.ItemsInCart[i].ProductID).First(&product)

		totalTransactionCost += float64(requestBody.ItemsInCart[i].Quantity * int(product.ProductPrice))

	}

	totalTransactionCost = math.Ceil(totalTransactionCost * 1.1)

	if requestBody.PaymentMethodID == 2 {

		if totalTransactionCost > float64(user.Currency) {
			c.String(200, "You don't have Enough Money")
			return
		}

		user.Currency -= int(totalTransactionCost)
		config.DB.Save(&user)

	}

	// 1 Header
	var header model.OrderHeader
	header.AddressID = requestBody.Address.ID
	header.DeliveryProviderID = requestBody.DeliveryProviderID
	header.PaymentMethodID = requestBody.PaymentMethodID
	header.UserID = requestBody.UserID

	config.DB.Model(model.OrderHeader{}).Create(&header)

	// Many Details
	length = len(requestBody.ItemsInCart)
	for i := 0; i < length; i++ {

		var order model.OrderDetail

		order.OrderHeaderID = header.ID
		order.ProductID = requestBody.ItemsInCart[i].ProductID
		order.Quantity = requestBody.ItemsInCart[i].Quantity
		order.Status = "Ongoing"

		config.DB.Model(model.OrderDetail{}).Create(&order)

	}

	// Empty Cart
	var cartEntries []model.Cart
	config.DB.Model(model.Cart{}).Where("user_id = ?", requestBody.UserID).Find(&cartEntries)

	length = len(cartEntries)
	for i := 0; i < length; i++ {
		config.DB.Model(model.Cart{}).Delete(&cartEntries[i])
	}

	c.String(200, "Checkout Successful")

}

func GetOrders(c *gin.Context) {

	type RequestBody struct {
		ShopID      uint `json:"shop_id"`
		IsCancelled bool `json:"is_cancelled"`
		IsOngoing   bool `json:"is_ongoing"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	type ProductIDsByShopID struct {
		ProductID string `json:"product_id"`
	}
	var productsByShopID []ProductIDsByShopID

	config.DB.Model(model.Product{}).Where("shop_id = ?", requestBody.ShopID).Find(&productsByShopID)

	length := len(productsByShopID)
	var productIDs []string
	for i := 0; i < length; i++ {
		productIDs = append(productIDs, productsByShopID[i].ProductID)
	}

	var orders []model.OrderDetail

	if requestBody.IsOngoing {

		var temp []model.OrderDetail
		config.DB.Model(model.OrderDetail{}).Where("product_id IN ?", productIDs).Where("status = ?", "Ongoing").Find(&temp)
		orders = append(orders, temp...)

	}

	if requestBody.IsCancelled {

		var temp []model.OrderDetail
		config.DB.Model(model.OrderDetail{}).Where("product_id IN ?", productIDs).Where("status = ?", "Cancelled").Find(&temp)
		orders = append(orders, temp...)

	}

	type Response struct {
		Header  model.OrderHeader `json:"header"`
		Detail  model.OrderDetail `json:"detail"`
		Address model.Address     `json:"address"`
	}
	var responses []Response

	length = len(orders)
	for i := 0; i < length; i++ {

		var response Response
		response.Detail = orders[i]
		config.DB.Model(model.OrderHeader{}).Where("id = ?", response.Detail.OrderHeaderID).First(&response.Header)
		config.DB.Model(model.Address{}).Where("id = ?", response.Header.AddressID).First(&response.Address)

		responses = append(responses, response)

	}

	c.JSON(200, responses)

}

func MarkOrderAsFinished(c *gin.Context) {

	type RequestBody struct {
		OrderDetailID uint `json:"order_detail_id"`
	}
	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var orderDetail model.OrderDetail
	config.DB.Model(model.OrderDetail{}).Where("id = ?", requestBody.OrderDetailID).First(&orderDetail)

	orderDetail.Status = "Finished"
	config.DB.Save(&orderDetail)

	c.String(200, "Transaction Marked As Finished")

}

func GetUserOrders(c *gin.Context) {

	type RequestBody struct {
		UserID      uint   `json:"user_id"`
		IsOngoing   bool   `json:"is_ongoing"`
		IsCancelled bool   `json:"is_cancelled"`
		Keyword     string `json:"keyword"`
		OrderNumber string `json:"order_number"`
		OrderDate   string `json:"order_date"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var orderHeaders []model.OrderHeader

	config.DB.Model(model.OrderHeader{}).Where("user_id = ?", requestBody.UserID).Where("CAST(id AS VARCHAR) ILIKE ?", "%"+requestBody.OrderNumber+"%").Find(&orderHeaders)
	type Response struct {
		Header  model.OrderHeader `json:"header"`
		Detail  model.OrderDetail `json:"detail"`
		Product model.Product     `json:"product"`
	}
	var responses []Response

	length := len(orderHeaders)
	for i := 0; i < length; i++ {

		var details []model.OrderDetail

		if requestBody.IsOngoing {

			var temp []model.OrderDetail
			config.DB.Model(model.OrderDetail{}).Where("order_header_id = ?", orderHeaders[i].ID).Where("status = ?", "Ongoing").Find(&temp)

			detailLength := len(temp)

			var withKeyword []model.OrderDetail
			for j := 0; j < detailLength; j++ {

				var product model.Product
				config.DB.Model(model.Product{}).Where("product_id = ?", temp[j].ProductID).Where("product_name ILIKE ?", "%"+requestBody.Keyword+"%").First(&product)

				if product.ID == 0 {
					continue
				}

				withKeyword = append(withKeyword, temp[j])

			}

			details = append(details, withKeyword...)

		}

		if requestBody.IsCancelled {

			var temp []model.OrderDetail
			config.DB.Model(model.OrderDetail{}).Where("order_header_id = ?", orderHeaders[i].ID).Where("status = ?", "Cancelled").Find(&temp)

			detailLength := len(temp)
			var withKeyword []model.OrderDetail
			for j := 0; j < detailLength; j++ {

				var product model.Product
				config.DB.Model(model.Product{}).Where("product_id = ?", temp[j].ProductID).Where("product_name ILIKE ?", "%"+requestBody.Keyword+"%").First(&product)

				if product.ID == 0 {
					continue
				}

				withKeyword = append(withKeyword, temp[j])

			}

			details = append(details, withKeyword...)

		}

		detailsLength := len(details)

		for j := 0; j < detailsLength; j++ {

			var response Response
			response.Header = orderHeaders[i]
			response.Detail = details[j]
			config.DB.Model(model.Product{}).Where("product_id = ?", details[j].ProductID).First(&response.Product)

			// If Date == requestBody.OrderDate, append

			if requestBody.OrderDate == "" {

				responses = append(responses, response)

			} else {

				if response.Header.CreatedAt.String()[:10] == requestBody.OrderDate {

					responses = append(responses, response)

				}

			}

		}

	}

	c.JSON(200, responses)

}
