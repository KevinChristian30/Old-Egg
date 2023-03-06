package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func ProductRoute(router *gin.Engine) {

	router.POST("/create-product", controller.CreateProduct)
	router.POST("/get-products", controller.GetProducts)
	router.POST("/get-product-by-id", controller.GetProductByID)
	router.POST("/update-product", controller.UpdateProduct)

}
