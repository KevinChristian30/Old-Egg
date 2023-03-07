package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func DeliveryProviderRoute(router *gin.Engine) {

	router.GET("get-delivery-providers", controller.GetDeliveryProviders)

}
