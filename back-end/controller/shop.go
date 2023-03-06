package controller

import (
	"fmt"
	"os"
	"strconv"
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

	type RequestBody struct {
		PageNumber int  `json:"page_number"`
		IsActive   bool `json:"is_active"`
		IsBanned   bool `json:"is_banned"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	pageSize := 4

	if requestBody.IsActive && requestBody.IsBanned {

		shops := []model.Shop{}
		config.DB.Model(model.Shop{}).Limit(pageSize).Offset((requestBody.PageNumber - 1) * pageSize).Find(&shops)

		c.JSON(200, shops)
		return

	}

	if requestBody.IsActive {

		shops := []model.Shop{}
		config.DB.Model(model.Shop{}).Where("status = ?", "Active").Limit(pageSize).Offset((requestBody.PageNumber - 1) * pageSize).Find(&shops)

		c.JSON(200, shops)
		return

	}

	if requestBody.IsBanned {

		shops := []model.Shop{}
		config.DB.Model(model.Shop{}).Where("status = ?", "Banned").Limit(pageSize).Offset((requestBody.PageNumber - 1) * pageSize).Find(&shops)

		c.JSON(200, shops)
		return

	}

	shops := []model.Shop{}
	c.JSON(200, &shops)

}

func UpdateShop(c *gin.Context) {

	var shop model.Shop
	c.ShouldBindJSON(&shop)

	config.DB.Model(&model.Shop{}).Where("shop_email = ?", shop.ShopEmail).Updates(map[string]interface{}{"status": shop.Status})

	c.JSON(200, &shop)

}

func UpdateShopProfile(c *gin.Context) {

	type RequestBody struct {
		Token              string `json:"token"`
		ShopEmail          string `json:"shop_email"`
		ShopName           string `json:"shop_name"`
		AboutUs            string `json:"about_us"`
		DisplayPictureLink string `json:"display_picture_link"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	tokenString := requestBody.Token
	result, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil

	})

	if err != nil {
		c.String(200, "Token Parsing Failed")
		return
	}

	if claims, ok := result.Claims.(jwt.MapClaims); ok && result.Valid {

		if float64(time.Now().Unix()) > claims["expire"].(float64) {

			c.String(200, "Cookie Expired")
			return

		}

		var shop model.Shop
		config.DB.First(&shop, "shop_email = ?", claims["subject"])

		if shop.ShopEmail == requestBody.ShopEmail {

			config.DB.Model(&model.Shop{}).Where("shop_email = ?", requestBody.ShopEmail).Updates(map[string]interface{}{
				"shop_name":            requestBody.ShopName,
				"about_us":             requestBody.AboutUs,
				"display_picture_link": requestBody.DisplayPictureLink,
			})

			c.JSON(200, &requestBody)

		} else {

			c.String(200, "You Are Not Authorized to Update This Profile")

		}

	}

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

func GetShopInformation(c *gin.Context) {

	type RequestBody struct {
		Email string `json:"email"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	type ResponseBody struct {
		Shop          model.Shop `json:"shop"`
		AverageRating float64    `json:"average_rating"`
		NumberOfSales int64      `json:"number_of_sales"`
	}

	var responseBody ResponseBody
	config.DB.Model(model.Shop{}).Where("shop_email = ?", requestBody.Email).First(&responseBody.Shop)

	if responseBody.Shop.ID == 0 {
		c.String(200, "Email Not Found")
		return
	}

	// Get Average Rating
	var ratings []model.ShopRating
	config.DB.Model(model.ShopRating{}).Where("shop_id = ?", responseBody.Shop.ID).Find(&ratings)

	length := len(ratings)
	for i := 0; i < length; i++ {
		responseBody.AverageRating += ratings[i].Rating
	}

	if length > 0 {
		responseBody.AverageRating /= float64(length)
	}

	responseBody.AverageRating, _ = strconv.ParseFloat(fmt.Sprintf("%.2f", responseBody.AverageRating), 32)

	// Get Number of Sales
	config.DB.Model(model.SalesHeader{}).Where("shop_id = ?", responseBody.Shop.ID).Count(&responseBody.NumberOfSales)

	c.JSON(200, responseBody)

}
