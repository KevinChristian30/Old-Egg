package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func ShopRoute(router *gin.Engine) {

	router.POST("/create-shop", controller.CreateShop)

}
