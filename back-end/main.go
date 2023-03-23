package main

import (
	"net/http"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/route"
	"github.com/gin-gonic/gin"
	"github.com/rs/cors"
)

func main() {

	router := gin.New()

	opts := cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowCredentials: true,
	}

	handler := cors.New(opts).Handler(router)

	config.Connect()

	route.UserRoute(router)
	route.VoucherRoute(router)
	route.ShopRoute(router)
	route.PromotionPictureRoute(router)
	route.ProductCategoryRoute(router)
	route.ProductRoute(router)
	route.ProductImageLinkRoute(router)
	route.EmailRoute(router)
	route.NotificationRoute(router)
	route.OneTimeCodeRoute(router)
	route.SearchQueryRoute(router)
	route.CartRoute(router)
	route.WishlistRoute(router)
	route.SavedForLaterItemsRoute(router)
	route.AddressRoute(router)
	route.DeliveryProviderRoute(router)
	route.PaymentMethodRoute(router)
	route.OrderRoute(router)
	route.MessageRoute(router)
	route.ReviewRoute(router)
	route.ProductPromotionRoute(router)
	route.FollowRoute(router)
	route.CommentRoute(router)
	route.CustomerServiceReviewRoute(router)

	http.ListenAndServe(":8080", handler)

}
