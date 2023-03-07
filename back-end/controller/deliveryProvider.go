package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func GetDeliveryProviders(c *gin.Context) {

	var deliveryProviders []model.DeliveryProvider
	config.DB.Model(model.DeliveryProvider{}).Find(&deliveryProviders)
	c.JSON(200, deliveryProviders)

}
