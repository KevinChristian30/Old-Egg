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

func ApplyVoucher(c *gin.Context) {

	type RequestBody struct {
		Email       string `json:"email"`
		VoucherCode string `json:"voucher_code"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	// Validate if Voucher Code Exists
	var voucher model.Voucher
	config.DB.Model(model.Voucher{}).Where("voucher_code = ?", requestBody.VoucherCode).First(&voucher)

	if voucher.ID == 0 {
		c.String(200, "Voucher Code doesn't Exist")
		return
	}

	// Validate if Voucher is Still Applicable
	if voucher.VoucherQuota <= 0 {
		c.String(200, "Voucher Code Is Fully Redeemed, You are Unlucky")
		return
	}

	// Update User's Currency
	var user model.User
	config.DB.Model(model.User{}).Where("email = ?", requestBody.Email).First(&user)
	user.Currency += int(voucher.VoucherDiscount)
	config.DB.Save(&user)

	// Update Voucher's Quota
	voucher.VoucherQuota -= 1
	config.DB.Save(&voucher)

	c.String(200, "Voucher Applied Successfully")

}
