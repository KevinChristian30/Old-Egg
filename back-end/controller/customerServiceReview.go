package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateCustomerServiceReview(c *gin.Context) {

	var review model.CustomerServiceReview
	c.ShouldBindJSON(&review)
	config.DB.Model(model.CustomerServiceReview{}).Create(&review)
	c.JSON(200, review)

}
