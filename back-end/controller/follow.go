package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateFollow(c *gin.Context) {

	var follow model.Follow
	c.ShouldBindJSON(&follow)

	var search model.Follow
	config.DB.Model(model.Follow{}).Where("user_id = ?", follow.UserID).Where("wishlist_id = ?", follow.WishlistID).First(&search)

	if search.ID == 0 {

		config.DB.Model(model.Follow{}).Create(&follow)
		c.JSON(200, follow)

	} else {

		c.String(200, "You Already Followed This Wishlist")

	}

}

func GetFollowedWishlists(c *gin.Context) {

	type Body struct {
		UserID uint `json:"user_id"`
	}
	var body Body
	c.ShouldBindJSON(&body)

	var follows []model.Follow
	config.DB.Model(model.Follow{}).Where("user_id = ?", body.UserID).Find(&follows)

	// Get Wislists
	var wishlists []model.Wishlist

	length := len(follows)
	for i := 0; i < length; i++ {

		var wishlist model.Wishlist
		config.DB.Model(model.Wishlist{}).Where("id = ?", follows[i].WishlistID).First(&wishlist)

		wishlists = append(wishlists, wishlist)

	}

	c.JSON(200, wishlists)

}

func DeleteFollow(c *gin.Context) {

	var follow, toDelete model.Follow
	c.ShouldBindJSON(&follow)

	config.DB.Model(model.Follow{}).Where("user_id = ?", follow.UserID).Where("wishlist_id = ?", follow.WishlistID).Find(&toDelete)
	config.DB.Model(model.Follow{}).Delete(&toDelete)

	c.String(200, "Follow Deleted")

}
