package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateSearchQuery(c *gin.Context) {

	var searchQuery model.SearchQuery
	c.ShouldBindJSON(&searchQuery)

	var countSearchQueries int64
	config.DB.Model(model.SearchQuery{}).Where("email = ?", searchQuery.Email).Count(&countSearchQueries)

	if countSearchQueries >= 10 {
		c.String(200, "You Already Have 10 Saved Search Queries")
		return
	}

	config.DB.Create(&searchQuery)
	c.JSON(200, &searchQuery)
	c.String(200, "Search Query Saved")

}
