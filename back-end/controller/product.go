package controller

import (
	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
)

func CreateProduct(c *gin.Context) {

	var product model.Product
	c.ShouldBindJSON(&product)
	config.DB.Create(&product)
	c.JSON(200, &product)

}

func GetAllProducts(c *gin.Context) {

	type Product struct {
		ProductID          string   `json:"product_id"`
		ShopID             int      `json:"shop_id"`
		ProductCategoryID  int      `json:"product_category_id"`
		ProductName        string   `json:"product_name"`
		ProductImageURLS   []string `json:"product_image_urls"`
		ProductDescription string   `json:"product_description"`
		ProductPrice       float64  `json:"product_price"`
		ProductStock       int      `json:"product_stock"`
		ProductDetails     string   `json:"product_details"`
	}

	products := []model.Product{}
	config.DB.Find(&products)

	c.JSON(200, products)
	return

	length := len(products)
	parsedProducts := []Product{}
	parsedProductsCount := 0

	for i := 0; i < length; i++ {

		if i == 0 {

			product := Product{
				products[i].ProductID,
				products[i].ShopID,
				products[i].ProductCategoryID,
				products[i].ProductName,
				[]string{products[i].ProductImageURL},
				products[i].ProductDescription,
				products[i].ProductPrice,
				products[i].ProductStock,
				products[i].ProductDetails,
			}

			parsedProducts = append(parsedProducts, product)
			parsedProductsCount++

		} else {

			if products[i].ProductID == products[i-1].ProductID {
				parsedProducts[parsedProductsCount-1].ProductImageURLS = append(parsedProducts[parsedProductsCount-1].ProductImageURLS, products[i].ProductImageURL)
			} else {

				product := Product{
					products[i].ProductID,
					products[i].ShopID,
					products[i].ProductCategoryID,
					products[i].ProductName,
					[]string{products[i].ProductImageURL},
					products[i].ProductDescription,
					products[i].ProductPrice,
					products[i].ProductStock,
					products[i].ProductDetails,
				}

				parsedProducts = append(parsedProducts, product)
				parsedProductsCount++

			}

		}

	}

	c.JSON(200, parsedProducts)

}
