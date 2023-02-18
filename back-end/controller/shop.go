package controller

import (
	"os"
	"time"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func CreateShop(c *gin.Context) {

	var shop model.Shop
	c.ShouldBindJSON(&shop)

	// Unique Email Validation
	var countEmail int64 = 0
	config.DB.Model(model.Shop{}).Where("email = ?", shop.ShopEmail).Count(&countEmail)

	if countEmail != 0 {
		c.String(200, "Email is Not Unique")
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(shop.ShopPassword), 10)

	if err != nil {
		c.String(200, "Password Hashing Failed")
		return
	}

	shop.ShopPassword = string(hashedPassword)

	config.DB.Create(&shop)
	c.JSON(200, &shop)

}

func GetShops(c *gin.Context) {

	shops := []model.Shop{}
	config.DB.Find(&shops)
	c.JSON(200, &shops)

}

func UpdateShop(c *gin.Context) {

	var shop model.Shop
	c.ShouldBindJSON(&shop)

	config.DB.Model(&model.Shop{}).Where("shop_email = ?", shop.ShopEmail).Updates(map[string]interface{}{"status": shop.Status})

	c.JSON(200, &shop)

}

func ShopSignIn(c *gin.Context) {

	var attempt model.User
	c.ShouldBindJSON(&attempt)

	var shop model.Shop
	config.DB.First(&shop, "shop_email = ?", attempt.Email)

	if shop.ID == 0 {
		c.String(200, "Invalid Email Address")
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(shop.ShopPassword), []byte(attempt.Password))
	if err != nil {
		c.String(200, "Invalid Password")
		return
	}

	if shop.Status != "Active" {
		c.String(200, "You Are Banned")
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"subject": shop.ShopEmail,
		"expire":  time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRETKEY")))
	if err != nil {
		c.String(200, "Failed to Create Token")
		return
	}

	c.String(200, tokenString)

}
