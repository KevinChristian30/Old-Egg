package middleware

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RequireAuthentication(c *gin.Context) {

	// tokenString, err := c.Cookie("Auth")
	// if err != nil {
	// 	c.String(200, "Couldn't Get Cookie")
	// 	return
	// }

	// fmt.Printf(tokenString)
	// return

	type Token struct {
		gorm.Model
		token string `json: "token"`
	}

	var t Token
	c.ShouldBindJSON(&t)

	c.JSON(200, t)

	// token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

	// 	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
	// 		return nil, fmt.Errorf("Unexpected Signing Method: %v", token.Header)
	// 	}

	// 	return os.Getenv("SECRETKEY"), nil

	// })

	// if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

	// 	// if float64(time.Now().Unix()) > claims["expires"].(float64) {
	// 	// 	c.String(200, "Cookie Expired")
	// 	// }

	// 	var user model.User
	// 	config.DB.First(&user, claims["Auth"])

	// 	if user.ID == 0 {
	// 		c.String(200, "User Not Found")
	// 	}

	// 	c.Set("user", user)
	// 	c.Next()

	// }

}
