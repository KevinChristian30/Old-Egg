package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func ReviewRoute(router *gin.Engine) {

	router.POST("/get-reviews", controller.GetReviews)
	router.POST("/delete-review", controller.DeleteReview)
	router.POST("/update-review", controller.UpdateReview)

	router.POST("/get-reviews-by-shop", controller.GetReviewsByShop)
	router.GET("/get-customer-service-reviews", controller.GetCustomerServiceReviews)

	router.POST("/increment-helpful-count", controller.IncrementHelpfulCount)
	router.POST("/increment-unhelpful-count", controller.IncrementUnhelpfulCount)

}
