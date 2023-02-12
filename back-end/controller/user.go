package controller

import (
	"fmt"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func GetUsers(c *gin.Context) {

	users := []model.User{}
	config.DB.Find(&users)
	c.JSON(200, &users)

}

func CreateUser(c *gin.Context) {

	var newUser model.User
	c.ShouldBindJSON(&newUser)

	fmt.Println(newUser.Password)

	// Unique Email Validation
	var countEmail int64 = 0
	config.DB.Model(model.User{}).Where("email = ?", newUser.Email).Count(&countEmail)

	if countEmail != 0 {
		c.String(200, "Email is Not Unique")
		return
	}

	// Unique Phone Number Validation
	var countPhone int64 = 0
	config.DB.Model(model.User{}).Where("mobile_phone_number = ?", newUser.MobilePhoneNumber).Count(&countPhone)

	if countPhone != 0 {
		c.String(200, "Mobile Phone Number is Not Unique")
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), 14)

	if err != nil {
		panic(err)
	}

	newUser.Password = hashedPassword

	config.DB.Create(&newUser)
	c.JSON(200, &newUser)

}
