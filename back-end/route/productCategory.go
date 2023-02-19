package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func ProductCategoryRoute(router *gin.Engine) {

	router.GET("/get-product-categories", controller.GetProductCategories)

}
