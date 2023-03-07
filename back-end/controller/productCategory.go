package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func GetProductCategories(c *gin.Context) {

	productCategories := []model.ProductCategory{}
	config.DB.Find(&productCategories)
	c.JSON(200, &productCategories)

}

func GetProductCategoryByShopID(c *gin.Context) {

	type RequestBody struct {
		ShopID int64 `json:"id"`
	}

	var requestBody RequestBody
	c.ShouldBindJSON(&requestBody)

	var productCategoryIDs []int64
	config.DB.Model(model.Product{}).Where("shop_id = ?", requestBody.ShopID).Distinct().Pluck("product_category_id", &productCategoryIDs)

	var productCategories []model.ProductCategory
	config.DB.Model(model.ProductCategory{}).Where("id IN ?", productCategoryIDs).Find(&productCategories)

	c.JSON(200, productCategories)

}

func GetPopularProductCategories(c *gin.Context) {

	type Result struct {
		ProductCategoryName string `json:"product_category_name"`
		Count               int64  `json:"count"`
	}
	var result []Result

	rows, _ := config.DB.Raw(`SELECT product_category_name, COUNT(product_categories.product_category_id)
				FROM order_details 
					JOIN products ON 
						order_details.product_id = products.product_id
			   		JOIN product_categories ON 
						product_categories.product_category_id = products.product_category_id
				GROUP BY product_categories.product_category_id,
						product_category_name
				LIMIT 3`).Rows()

	for rows.Next() {

		var row Result
		err := rows.Scan(&row.ProductCategoryName, &row.Count)
		if err != nil {
			panic(err)
		}

		result = append(result, row)

	}

	c.JSON(200, result)

}
