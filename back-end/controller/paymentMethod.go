package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func GetPaymentMethods(c *gin.Context) {

	var paymentMethods []model.PaymentMethod
	config.DB.Model(model.PaymentMethod{}).Find(&paymentMethods)
	c.JSON(200, paymentMethods)

}
