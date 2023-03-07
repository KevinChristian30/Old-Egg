package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func SaveItemForLater(c *gin.Context) {

	var item model.SavedForLaterItems
	c.ShouldBindJSON(&item)
	config.DB.Model(model.SavedForLaterItems{}).Create(&item)
	c.JSON(200, item)

}

func GetSavedForLaterItems(c *gin.Context) {

	type RequestBody struct {
		UserID int64 `json:"user_id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var items []model.SavedForLaterItems
	config.DB.Model(model.SavedForLaterItems{}).Where("user_id = ?", &requestBody.UserID).Find(&items)

	type Response struct {
		Item              model.SavedForLaterItems `json:"saved_for_later_item"`
		Product           model.Product            `json:"product"`
		ProductImageLinks []string                 `json:"product_image_links"`
	}

	var response []Response

	length := len(items)
	for i := 0; i < length; i++ {

		var entry Response
		entry.Item = items[i]
		config.DB.Model(model.Product{}).Where("product_id = ?", items[i].ProductID).Find(&entry.Product)

		var links []model.ProductImageLink
		config.DB.Model(model.ProductImageLink{}).Where("product_id = ?", items[i].ProductID).Find(&links)

		length := len(links)
		for i := 0; i < length; i++ {
			entry.ProductImageLinks = append(entry.ProductImageLinks, links[i].Link)
		}

		response = append(response, entry)

	}

	c.JSON(200, response)

}
