package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func AddressRoute(router *gin.Engine) {

	router.POST("/create-address", controller.CreateAddress)
	router.POST("/get-address", controller.GetAddresses)
	router.POST("/remove-address", controller.RemoveAddress)

}
