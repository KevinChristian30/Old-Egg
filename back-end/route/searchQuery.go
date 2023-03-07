package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func SearchQueryRoute(router *gin.Engine) {

	router.POST("/create-search-query", controller.CreateSearchQuery)

}
