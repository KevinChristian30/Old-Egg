package model

import "gorm.io/gorm"

type ProductImageLink struct {
	gorm.Model
	ProductID string `json:"product_id" gorm:"References:products(product_id)"`
	Link      string `json:"link"`
}
