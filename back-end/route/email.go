package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func EmailRoute(router *gin.Engine) {

	router.POST("/blast-newsletter", controller.BlastEmail)
	router.POST("/send-email", controller.SendEmail)

}
