package main

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/route"
	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.New()
	config.Connect()

	route.UserRoute(router)
	router.Run(":8080")

}
