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

func GetAllProducts(c *gin.Context) {

}
