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
)

func GetReviews(c *gin.Context) {

	type RequestBody struct {
		UserID uint `json:"user_id"`
	}
	var requestBody RequestBody

	c.ShouldBindJSON(&requestBody)

	var reviews []model.Review
	config.DB.Model(model.Review{}).Where("user_id = ?", requestBody.UserID).Find(&reviews)

	c.JSON(200, reviews)

}

func DeleteReview(c *gin.Context) {

	type RequestBody struct {
		Token    string `json:"token"`
		ReviewId uint   `json:"review_id"`
	}
	var requestBody RequestBody

	c.ShouldBindJSON(&requestBody)

	// Get User
	if requestBody.Token == "" {
		c.String(200, "Couldn't Get Cookie")
		return
	}

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

		var user model.User
		config.DB.First(&user, "email = ?", claims["subject"])

		// Get Review
		var toDelete model.Review
		config.DB.Model(model.Review{}).Where("id = ?", requestBody.ReviewId).First(&toDelete)

		if toDelete.UserID == user.ID {

			config.DB.Delete(&toDelete)
			c.String(200, "Review Deleted")

		} else {

			c.String(200, "You Are Not Allowed to Delete This Review")

		}

	} else {

		c.String(200, "Server Error")

	}

}

func UpdateReview(c *gin.Context) {

	type RequestBody struct {
		Token    string `json:"token"`
		ReviewId uint   `json:"review_id"`
		Rating   int    `json:"rating"`
		Details  string `json:"details"`
	}
	var requestBody RequestBody

	c.ShouldBindJSON(&requestBody)

	// Get User
	if requestBody.Token == "" {
		c.String(200, "Couldn't Get Cookie")
		return
	}

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

		var user model.User
		config.DB.First(&user, "email = ?", claims["subject"])

		// Get Review
		var toUpdate model.Review
		config.DB.Model(model.Review{}).Where("id = ?", requestBody.ReviewId).First(&toUpdate)

		if toUpdate.UserID == user.ID {

			// Update Here
			toUpdate.Rating = requestBody.Rating
			toUpdate.Details = requestBody.Details
			config.DB.Save(&toUpdate)
			c.String(200, "Review Updated")

		} else {

			c.String(200, "You Are Not Allowed to Update This Review")

		}

	} else {

		c.String(200, "Server Error")

	}

}

func GetReviewsByShop(c *gin.Context) {

	type RequestBody struct {
		ShopID int `json:"shop_id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	query := `
		SELECT shop_id,
			P.product_name,
			R.details,
			R.rating,
			U.first_name,
			R.id
		FROM reviews R 
			JOIN order_details OD ON R.order_detail_id = OD.ID
			JOIN products P ON OD.product_id = p.product_id
			JOIN order_headers OH ON OH.id = OD.order_header_id
			JOIN users U ON U.id = OH.user_id
		WHERE shop_id = ` + strconv.Itoa(requestBody.ShopID)

	rows, _ := config.DB.Raw(query).Rows()

	type Result struct {
		ShopID      string `json:"shop_id"`
		ProductName string `json:"product_name"`
		Details     string `json:"details"`
		Rating      int    `json:"rating"`
		FirstName   string `json:"first_name"`
		ReviewID    int    `json:"review_id"`
	}

	var result []Result

	for rows.Next() {

		var row Result
		err := rows.Scan(&row.ShopID, &row.ProductName, &row.Details, &row.Rating, &row.FirstName, &row.ReviewID)
		if err != nil {
			panic(err)
		}

		result = append(result, row)

	}

	c.JSON(200, result)

}

func IncrementHelpfulCount(c *gin.Context) {

	type RequestBody struct {
		ReviewID uint `json:"review_id"`
	}
	var requestBody RequestBody

	c.ShouldBindJSON(&requestBody)

	var toUpdate model.Review
	config.DB.Model(model.Review{}).Where("id = ?", requestBody.ReviewID).First(&toUpdate)

	toUpdate.CountHelpful++

	config.DB.Save(&toUpdate)

}

func IncrementUnhelpfulCount(c *gin.Context) {

	type RequestBody struct {
		ReviewID uint `json:"review_id"`
	}
	var requestBody RequestBody

	c.ShouldBindJSON(&requestBody)

	var toUpdate model.Review
	config.DB.Model(model.Review{}).Where("id = ?", requestBody.ReviewID).First(&toUpdate)

	toUpdate.CountUnhelpful++

	config.DB.Save(&toUpdate)

}
