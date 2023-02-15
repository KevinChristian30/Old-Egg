package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateVoucher(c *gin.Context) {

	var voucher model.Voucher
	c.ShouldBindJSON(&voucher)

	// Validasi Unique Voucher Code
	var count int64 = 0
	config.DB.Model(model.Voucher{}).Where("voucher_code = ?", voucher.VoucherCode).Count(&count)

	if count != 0 {
		c.String(200, "Voucher Code Isn't Unique")
		return
	}

	config.DB.Create(&voucher)

	c.JSON(200, voucher)

}
