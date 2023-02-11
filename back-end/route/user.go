package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {

	router.GET("/", controller.GetUsers)
	router.POST("/", controller.CreateUser)

}
