package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func GetOneTimeCode(c *gin.Context) {

	type RequestBody struct {
		Email string `json:"email"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	oneTimeCode := []model.OneTimeCode{}
	config.DB.Where("email = ?", requestBody.Email).First(&oneTimeCode)
	c.JSON(200, &oneTimeCode)

}
