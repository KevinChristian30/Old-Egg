package controller

import (
	"net/mail"
	"os"
	"time"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func GetUsers(c *gin.Context) {
 
	type RequestBody struct {
		PageNumber int `json:"page_number"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	pageSize := 8

	users := []model.User{}
	config.DB.Limit(pageSize).Offset((requestBody.PageNumber - 1) * pageSize).Find(&users)
	c.JSON(200, &users)

}

func CreateUser(c *gin.Context) {

	var newUser model.User
	c.ShouldBindJSON(&newUser)

	if newUser.FirstName == "" {
		c.String(200, "Field Cannot be Null")
		return
	}

	if newUser.LastName == "" {
		c.String(200, "Field Cannot be Null")
		return
	}

	if newUser.Email == "" {
		c.String(200, "Field Cannot be Null")
		return
	}

	if newUser.MobilePhoneNumber == "" {
		c.String(200, "Field Cannot be Null")
		return
	}

	if newUser.Password == "" {
		c.String(200, "Field Cannot be Null")
		return
	}

	if newUser.RoleID == 0 {
		c.String(200, "Field Cannot be Null")
		return
	}

	if newUser.Status == "" {
		c.String(200, "Field Cannot be Null")
		return
	}

	// Unique Email Validation
	var countEmail int64 = 0
	config.DB.Model(model.User{}).Where("email = ?", newUser.Email).Count(&countEmail)

	// Valid Email Validation
	_, err := mail.ParseAddress(newUser.Email)
	if err != nil {
		c.String(200, "Invalid Email Format")
		return
	}

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

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), 10)

	if err != nil {
		panic(err)
	}

	newUser.Password = string(hashedPassword)

	config.DB.Create(&newUser)
	c.JSON(200, &newUser)

}

func SignIn(c *gin.Context) {

	var attempt, user model.User
	c.ShouldBindJSON(&attempt)

	config.DB.First(&user, "email = ?", attempt.Email)

	if user.ID == 0 {
		c.String(200, "Invalid Email Address")
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(attempt.Password))
	if err != nil {
		c.String(200, "Invalid Password")
		return
	}

	if user.Status != "Active" {
		c.String(200, "You Are Banned")
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"subject": user.Email,
		"expire":  time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRETKEY")))
	if err != nil {
		c.String(200, "Failed to Create Token")
		return
	}

	c.String(200, tokenString)

}

func Authenticate(c *gin.Context) {

	user, _ := c.Get("user")
	c.JSON(200, user)

}

func UpdateUser(c *gin.Context) {

	var user model.User
	c.ShouldBindJSON(&user)

	config.DB.Model(&model.User{}).Where("email = ?", user.Email).Updates(map[string]interface{}{"status": user.Status})

	c.JSON(200, &user)

}
