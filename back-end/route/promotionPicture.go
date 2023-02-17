package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func PromotionPictureRoute(router *gin.Engine) {

	router.POST("/create-promotion-picture", controller.CreatePromotionPicture)
	router.GET("/get-promotion-pictures", controller.GetPromotionPictures)
	router.POST("/delete-promotion-picture", controller.RemovePromotionPicture)

}
