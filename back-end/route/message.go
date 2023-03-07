package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func MessageRoute(router *gin.Engine) {

	router.GET("send-message", controller.SendingMessage)

}
