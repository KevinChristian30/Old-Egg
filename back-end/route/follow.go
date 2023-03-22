package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func FollowRoute(router *gin.Engine) {

	router.POST("/create-follow", controller.CreateFollow)
	router.POST("/get-followed-wishlists", controller.GetFollowedWishlists)
	router.POST("/delete-follow", controller.DeleteFollow)

}
