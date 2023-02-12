package controller

import (
	"fmt"
	"strconv"
	"time"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

const SECRETKEY = "secret"

func GetUsers(c *gin.Context) {

	users := []model.User{}
	config.DB.Find(&users)
	c.JSON(200, &users)

}

func CreateUser(c *gin.Context) {

	var newUser model.User
	c.ShouldBindJSON(&newUser)

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

func SignIn(c *gin.Context) {

	var attempt model.User
	c.ShouldBindJSON(&attempt)

	var user model.User
	config.DB.Model(model.User{}).Where("email = ?", attempt.Email).First(&user)

	if user.ID == 0 {
		c.String(200, "Email Not Found")
		return
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(attempt.Password)); err != nil {
		c.String(200, "Incorrect Password")
		return
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claims.SignedString([]byte(SECRETKEY))
	if err != nil {
		c.String(500, "Internal Server Error, Could Not Sign You In")
		return
	}

	cookie, err := c.Cookie("jwt_token")
	if err != nil {
		cookie = "NotSet"
		c.SetCookie("jwt_token", token, 3600*24, "/", "localhost", false, false)
	}

	fmt.Print(cookie)

	c.JSON(200, "Sign In Successfull")

}
