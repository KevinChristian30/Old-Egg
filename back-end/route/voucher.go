package route

import (
	"github.com/KevinChristian30/OldEgg/controller"
	"github.com/gin-gonic/gin"
)

func VoucherRoute(router *gin.Engine) {

	router.POST("/create-voucher", controller.CreateVoucher)

}
