package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateComment(c *gin.Context) {

	var comment model.Comment
	c.ShouldBindJSON(&comment)
	config.DB.Model(model.Comment{}).Create(&comment)
	c.JSON(200, comment)

}

func GetComments(c *gin.Context) {

	type Body struct {
		WishlistID uint `json:"wishlist_id"`
	}

	var body Body
	c.ShouldBindJSON(&body)

	var comments []model.Comment
	config.DB.Model(model.Comment{}).Where("wishlist_id = ?", body.WishlistID).Find(&comments)

	c.JSON(200, comments)

}
