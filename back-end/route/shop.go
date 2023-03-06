package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func ShopRoute(router *gin.Engine) {

	router.POST("/create-shop", controller.CreateShop)
	router.POST("/get-shops", controller.GetShops)
	router.POST("/update-shop", controller.UpdateShop)
	router.POST("/update-shop-profile", controller.UpdateShopProfile)

	router.POST("/shop-sign-in", controller.ShopSignIn)

	router.POST("/get-shop-information", controller.GetShopInformation)

}
