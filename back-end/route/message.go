package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func MessageRoute(router *gin.Engine) {

	router.GET("send-message", controller.SendMessage)
	router.POST("get-messages", controller.GetMessages)
	router.POST("delete-messages", controller.DeleteMessages)
	router.POST("get-chatting-customers", controller.GetChattingCustomers)

}
