package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func NotificationRoute(router *gin.Engine) {

	router.POST("/get-notifications", controller.GetNotifications)

}
