package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateFollow(c *gin.Context) {

	var follow model.Follow
	c.ShouldBindJSON(&follow)
	config.DB.Model(model.Follow{}).Create(&follow)
	c.JSON(200, follow)

}
