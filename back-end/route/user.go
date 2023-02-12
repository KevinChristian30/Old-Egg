package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {

	router.POST("/sign-up", controller.CreateUser)
	router.POST("/sign-in", controller.SignIn)

}
