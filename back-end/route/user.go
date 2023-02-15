package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/KevinChristian30/OldEgg/middleware"
	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {

	router.POST("/sign-up", controller.CreateUser)
	router.POST("/sign-in", controller.SignIn)
	router.POST("/authenticate", middleware.RequireAuthentication, controller.Authenticate)
	router.GET("/get-users", controller.GetUsers)

}
