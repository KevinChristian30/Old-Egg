package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func CustomerServiceReviewRoute(router *gin.Engine) {

	router.POST("create-customer-service-review", controller.CreateCustomerServiceReview)

}
