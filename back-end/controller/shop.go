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

func GetShops(c *gin.Context) {

	shops := []model.Shop{}
	config.DB.Find(&shops)
	c.JSON(200, &shops)

}

func UpdateShop(c *gin.Context) {

	var shop model.Shop
	c.ShouldBindJSON(&shop)

	config.DB.Model(&model.Shop{}).Where("shop_email = ?", shop.ShopEmail).Updates(map[string]interface{}{"status": shop.Status})

	c.JSON(200, &shop)

}
