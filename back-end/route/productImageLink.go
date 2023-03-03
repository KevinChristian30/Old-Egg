package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func ProductImageLinkRoute(router *gin.Engine) {

	router.POST("/create-product-image-link", controller.CreateProductImageLink)

}
