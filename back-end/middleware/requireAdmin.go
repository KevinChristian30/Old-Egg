package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RequireAdmin(c *gin.Context) {

	type JWTToken struct {
		gorm.Model
		TokenString string `json:"token_string"`
	}

	var token JWTToken
	c.BindJSON(&token)
	fmt.Println(token)

	c.Next()

}
