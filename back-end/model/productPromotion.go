package model

import "gorm.io/gorm"

type ProductPromotion struct {
	gorm.Model
	ProductID string `json:"product_id"`
	Discount  int    `json:"discount"`
}
