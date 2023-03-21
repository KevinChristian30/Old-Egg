package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func ProductPromotionRoute(router *gin.Engine) {

	router.GET("/get-product-promotions", controller.GetProductPromotions)

}
