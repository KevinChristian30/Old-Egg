package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {

	users := []model.User{}
	config.DB.Find(&users)
	c.JSON(200, &users)

}

func CreateUser(c *gin.Context) {

	var newUser model.User
	c.BindJSON(&newUser)
	config.DB.Create(&newUser)
	c.JSON(200, &newUser)

}
