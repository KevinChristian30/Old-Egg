package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreatePromotionPicture(c *gin.Context) {

	var promotionPicture model.PromotionPicture
	c.ShouldBindJSON(&promotionPicture)

	config.DB.Create(&promotionPicture)

	c.JSON(200, promotionPicture)

}

func GetPromotionPictures(c *gin.Context) {

	promotionPictures := []model.PromotionPicture{}
	config.DB.Find(&promotionPictures)
	c.JSON(200, &promotionPictures)

}

func RemovePromotionPicture(c *gin.Context) {

	var promotionPicture model.PromotionPicture
	c.ShouldBindJSON(&promotionPicture)
	config.DB.Delete(&model.PromotionPicture{}, promotionPicture.ID)
	c.JSON(200, "Deleted")

}
