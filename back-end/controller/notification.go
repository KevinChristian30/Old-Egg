package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func GetNotifications(c *gin.Context) {

	type RequestBody struct {
		UserID int `json:"user_id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	notifications := []model.Notification{}
	config.DB.Where("user_id = ?", requestBody.UserID).Find(&notifications)
	c.JSON(200, &notifications)

}
