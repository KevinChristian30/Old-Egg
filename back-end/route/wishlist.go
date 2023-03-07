package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func WishlistRoute(router *gin.Engine) {

	router.POST("/create-wishlist", controller.CreateWishlist)
	router.POST("/get-wishlists", controller.GetWishlists)

	router.POST("/add-to-wishlist", controller.AddToWishlist)
	router.POST("/remove-from-wishlist", controller.RemoveFromWishlist)

}
