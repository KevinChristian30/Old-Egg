package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
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
