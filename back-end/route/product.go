package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func ProductRoute(router *gin.Engine) {

	router.POST("/create-product", controller.CreateProduct)

}
