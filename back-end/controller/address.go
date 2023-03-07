package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateAddress(c *gin.Context) {

	var address model.Address
	c.ShouldBindJSON(&address)

	config.DB.Model(model.Address{}).Create(&address)
	c.JSON(200, address)

}

func GetAddresses(c *gin.Context) {

	type RequestBody struct {
		UserID int64 `json:"user_id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var addresses []model.Address
	config.DB.Model(model.Address{}).Where("user_id = ?", requestBody.UserID).Find(&addresses)

	c.JSON(200, addresses)

}

func RemoveAddress(c *gin.Context) {

	var address, toDelete model.Address
	c.ShouldBindJSON(&address)

	config.DB.Model(model.Address{}).Where("id = ?", address.ID).Find(&toDelete)
	config.DB.Model(model.Address{}).Delete(&toDelete)

	c.String(200, "Address Deleted")

}
