package controller

import (
	"fmt"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateProductImageLink(c *gin.Context) {

	var productImageLink model.ProductImageLink
	c.ShouldBindJSON(&productImageLink)

	fmt.Println(productImageLink.ID)
	fmt.Println(productImageLink.ProductID)
	fmt.Println(productImageLink.Link)

	config.DB.Create(&productImageLink)
	c.JSON(200, &productImageLink)

}
