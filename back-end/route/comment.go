package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func CommentRoute(router *gin.Engine) {

	router.POST("create-comment", controller.CreateComment)
	router.POST("get-comments", controller.GetComments)

}
