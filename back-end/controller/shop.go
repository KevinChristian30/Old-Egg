package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateShop(c *gin.Context) {

	var shop model.Shop
	c.ShouldBindJSON(&shop)

	config.DB.Create(&shop)

	c.JSON(200, shop)

}
