package main

import (
	"net/http"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/route"
	"github.com/gin-gonic/gin"
	"github.com/rs/cors"
)

func main() {

	router := gin.New()

	opts := cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}

	handler := cors.New(opts).Handler(router)

	config.Connect()
	route.UserRoute(router)
	http.ListenAndServe(":8080", handler)

}