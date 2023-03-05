package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateProduct(c *gin.Context) {

	var product model.Product
	c.ShouldBindJSON(&product)
	config.DB.Create(&product)
	c.JSON(200, &product)

}

func GetProducts(c *gin.Context) {

	type RequestBody struct {
		ShopID          int  `json:"shop_id"`
		PageNumber      int  `json:"page_number"`
		IsAvailableOnly bool `json:"is_available_only"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	pageSize := 50

	rawProducts := []model.Product{}
	if requestBody.IsAvailableOnly {

		config.DB.Model(model.Product{}).Where("shop_id = ?", requestBody.ShopID).Where("product_stock > 0").Limit(pageSize).Offset((requestBody.PageNumber - 1) * pageSize).Find(&rawProducts)

	} else {

		config.DB.Model(model.Product{}).Where("shop_id = ?", requestBody.ShopID).Limit(pageSize).Offset((requestBody.PageNumber - 1) * pageSize).Find(&rawProducts)

	}

	type Product struct {
		ProductID          string   `json:"product_id"`
		ShopID             int      `json:"shop_id"`
		ProductCategoryID  int      `json:"product_category_id"`
		ProductName        string   `json:"product_name"`
		ProductDescription string   `json:"product_description"`
		ProductPrice       float64  `json:"product_price"`
		ProductStock       int      `json:"product_stock"`
		ProductDetails     string   `json:"product_details"`
		ProductImageLinks  []string `json:"product_image_links"`
	}

	length := len(rawProducts)
	var parsedProducts []Product

	for i := 0; i < length; i++ {

		var product Product
		product.ProductID = rawProducts[i].ProductID
		product.ShopID = rawProducts[i].ShopID
		product.ProductCategoryID = rawProducts[i].ProductCategoryID
		product.ProductName = rawProducts[i].ProductName
		product.ProductDescription = rawProducts[i].ProductDescription
		product.ProductPrice = rawProducts[i].ProductPrice
		product.ProductStock = rawProducts[i].ProductStock
		product.ProductDetails = rawProducts[i].ProductDetails

		// Get ALl Image Links
		var productImageLinks []model.ProductImageLink
		config.DB.Model(model.ProductImageLink{}).Where("product_id = ?", product.ProductID).Find(&productImageLinks)

		var imageLinks []string
		productImageLinksLength := len(productImageLinks)
		for j := 0; j < productImageLinksLength; j++ {

			imageLinks = append(imageLinks, productImageLinks[j].Link)

		}
		product.ProductImageLinks = imageLinks

		parsedProducts = append(parsedProducts, product)

	}

	c.JSON(200, &parsedProducts)

}
