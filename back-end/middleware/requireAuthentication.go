package middleware

import (
	"fmt"
	"os"
	"time"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

func RequireAuthentication(c *gin.Context) {

	type JWTToken struct {
		gorm.Model
		TokenString string `json:"token_string"`
	}

	var token JWTToken
	c.BindJSON(&token)

	if token.TokenString == "" {
		c.String(200, "Couldn't Get Cookie")
		return
	}

	tokenString := token.TokenString
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
		config.DB.First(&user, "ID = ?", claims["subject"])

		if user.ID == 0 {
			c.String(200, "Email Not Found")
			return
		}

		c.Set("user", user)

		c.Next()

	} else {
		c.String(200, "Server Error")
	}

}
