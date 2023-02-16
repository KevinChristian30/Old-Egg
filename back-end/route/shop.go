package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func ShopRoute(router *gin.Engine) {

	router.POST("/create-shop", controller.CreateShop)
	router.GET("/get-shops", controller.GetShops)
	router.POST("/update-shop", controller.UpdateShop)

}
