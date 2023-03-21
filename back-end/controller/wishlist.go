package controller

import (
	"fmt"
	"os"
	"time"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func CreateWishlist(c *gin.Context) {

	var wishlist model.Wishlist
	c.ShouldBindJSON(&wishlist)
	config.DB.Model(model.Wishlist{}).Create(&wishlist)
	c.JSON(200, wishlist)

}

func GetWishlists(c *gin.Context) {

	type RequestBody struct {
		UserID int64 `json:"user_id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var wishlists []model.Wishlist
	config.DB.Model(model.Wishlist{}).Where("user_id = ?", requestBody.UserID).Find(&wishlists)

	c.JSON(200, wishlists)

}

func GetWishlistsWithDetails(c *gin.Context) {

	type RequestBody struct {
		UserID int64 `json:"user_id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var wishlists []model.Wishlist
	config.DB.Model(model.Wishlist{}).Where("user_id = ?", requestBody.UserID).Find(&wishlists)

	type Response struct {
		Header             model.Wishlist         `json:"header"`
		Detail             []model.WishlistDetail `json:"detail"`
		Products           []model.Product        `json:"products"`
		NumberOfPromotions int                    `json:"number_of_promotions"`
	}

	var responses []Response

	length := len(wishlists)
	for i := 0; i < length; i++ {

		var response Response

		var details []model.WishlistDetail
		config.DB.Model(model.WishlistDetail{}).Where("wishlist_detail_id = ?", wishlists[i].ID).Find(&details)

		response.Header = wishlists[i]
		response.Detail = details
		response.NumberOfPromotions = 0

		detailsLength := len(details)
		for j := 0; j < detailsLength; j++ {

			var promotion model.ProductPromotion
			config.DB.Model(model.ProductPromotion{}).Where("product_id = ?", details[j].ProductID).First(&promotion)
			if promotion.ID != 0 {
				response.NumberOfPromotions++
			}

			var product model.Product
			config.DB.Model(model.Product{}).Where("product_id = ?", details[j].ProductID)
			response.Products = append(response.Products, product)

		}

		responses = append(responses, response)

	}

	c.JSON(200, responses)

}

func GetWishlistDetailsByID(c *gin.Context) {

	type RequestBody struct {
		WishlistID uint `json:"wishlist_id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var wishlist model.Wishlist
	config.DB.Model(model.Wishlist{}).Where("id = ?", requestBody.WishlistID).First(&wishlist)

	type Response struct {
		Header  model.Wishlist       `json:"header"`
		Detail  model.WishlistDetail `json:"detail"`
		Product model.Product        `json:"product"`
	}

	var responses []Response

	var header model.Wishlist
	config.DB.Model(model.Wishlist{}).Where("id = ?", wishlist.ID).First(&header)

	var details []model.WishlistDetail
	config.DB.Model(model.WishlistDetail{}).Where("wishlist_detail_id = ?", wishlist.ID).Find(&details)

	detailsLength := len(details)
	for i := 0; i < detailsLength; i++ {

		var response Response

		var product model.Product
		config.DB.Model(model.Product{}).Where("product_id = ?", details[i].ProductID).First(&product)

		response.Header = header
		response.Detail = details[i]
		response.Product = product

		responses = append(responses, response)

	}

	c.JSON(200, responses)

}

func AddToWishlist(c *gin.Context) {

	var wishlistDetail model.WishlistDetail
	c.ShouldBindJSON(&wishlistDetail)

	config.DB.Model(model.WishlistDetail{}).Create(&wishlistDetail)
	c.JSON(200, wishlistDetail)

}

func RemoveFromWishlist(c *gin.Context) {

	var requestBody model.WishlistDetail
	c.ShouldBindJSON(&requestBody)

	var toDelete model.WishlistDetail
	config.DB.Model(model.WishlistDetail{}).Where("wishlist_detail_id = ?", requestBody.WishlistDetailID).Where("product_id = ?", requestBody.ProductID).Find(&toDelete)

	config.DB.Model(model.WishlistDetail{}).Delete(&toDelete)

	c.JSON(200, toDelete)

}

func UpdateWishlist(c *gin.Context) {

	type RequestBody struct {
		Token        string `json:"token"`
		WishlistID   uint   `json:"wishlist_id"`
		WishlistName string `json:"wishlist_name"`
		IsPrivate    bool   `json:"is_private"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	// Only Update if Token is Valid
	tokenString := requestBody.Token
	result, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil

	})

	if err != nil {
		c.String(200, "Token Parsing Failed")
		return
	}

	if claims, ok := result.Claims.(jwt.MapClaims); ok && result.Valid {

		if float64(time.Now().Unix()) > claims["expire"].(float64) {

			c.String(200, "Cookie Expired")
			return

		}

		var user model.User
		config.DB.First(&user, "email = ?", claims["subject"])

		var wishlist model.Wishlist
		config.DB.Model(&model.Wishlist{}).Where("id = ?", requestBody.WishlistID).First(&wishlist)

		if user.ID == uint(wishlist.UserID) {

			var toUpdate model.Wishlist
			config.DB.Model(model.Wishlist{}).Where("id = ?", requestBody.WishlistID).First(&toUpdate)

			toUpdate.WishListName = requestBody.WishlistName
			toUpdate.IsPrivate = requestBody.IsPrivate

			config.DB.Save(&toUpdate)

			c.String(200, "Wishlist Updated")

		} else {

			c.String(200, "You Are Not Authorized to Update This Product")

		}

	}

}

func SaveWishlistNote(c *gin.Context) {

	type Body struct {
		WishlistID int    `json:"wishlist_id"`
		Note       string `json:"note"`
	}
	var body Body
	c.ShouldBindJSON(&body)

	var header model.Wishlist
	config.DB.Model(model.Wishlist{}).Where("id = ?", body.WishlistID).First(&header)

	header.Note = body.Note

	config.DB.Save(&header)

	c.String(200, "Note Saved")

}

func UpdateItemQuantity(c *gin.Context) {

	type Body struct {
		WishlistDetailID int    `json:"wishlist_detail_id"`
		ProductID        string `json:"product_id"`
		Quantity         int    `json:"quantity"`
	}
	var body Body
	c.ShouldBindJSON(&body)

	var wishlistDetail model.WishlistDetail
	config.DB.Model(model.WishlistDetail{}).Where("wishlist_detail_id = ?", body.WishlistDetailID).Where("product_id = ?", body.ProductID).First(&wishlistDetail)

	wishlistDetail.Quantity = body.Quantity

	config.DB.Save(&wishlistDetail)

	c.String(200, "Quantity Updated")

}

func AddWishlistItemsToCart(c *gin.Context) {

	type Body struct {
		WishlistDetailID int `json:"wishlist_detail_id"`
	}
	var body Body
	c.ShouldBindJSON(&body)

}

func AddAllItemsToCart(c *gin.Context) {

	type Body struct {
		UserID           uint `json:"user_id"`
		WishlistDetailID uint `json:"wishlist_detail_id"`
	}
	var body Body
	c.ShouldBindJSON(&body)

	var wishlistDetails []model.WishlistDetail
	config.DB.Model(model.WishlistDetail{}).Where("wishlist_detail_id = ?", body.WishlistDetailID).Find(&wishlistDetails)

	length := len(wishlistDetails)
	for i := 0; i < length; i++ {

		var entry model.Cart
		entry.UserID = int(body.UserID)
		entry.ProductID = wishlistDetails[i].ProductID
		entry.Quantity = int(wishlistDetails[i].Quantity)

		// If Exist Add, if not create
		var existingCart model.Cart
		config.DB.Model(model.Cart{}).Where("user_id = ?", body.UserID).Where("product_id = ?", entry.ProductID).First(&existingCart)

		if existingCart.ID == 0 {

			config.DB.Model(model.Cart{}).Create(&entry)

		} else {

			existingCart.Quantity += entry.Quantity
			config.DB.Save(&existingCart)

		}

		c.String(200, "Item Added to Cart Successfully")

	}

}

func GetAllPublicWishlists(c *gin.Context) {

	type Body struct {
		PageNumber int `json:"page_number"`
		PageSize   int `json:"page_size"`
	}
	var body Body
	c.ShouldBindJSON(&body)

	var wishlists []model.Wishlist
	config.DB.Model(model.Wishlist{}).Where("is_private = ?", false).Limit(body.PageSize).Offset((body.PageNumber - 1) * body.PageSize).Find(&wishlists)
	c.JSON(200, wishlists)

}
