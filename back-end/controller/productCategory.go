package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func GetProductCategories(c *gin.Context) {

	productCategories := []model.ProductCategory{}
	config.DB.Find(&productCategories)
	c.JSON(200, &productCategories)

}
