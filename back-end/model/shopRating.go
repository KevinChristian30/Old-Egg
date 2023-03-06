package model

import "gorm.io/gorm"

type ShopRating struct {
	gorm.Model
	ShopID int     `json:"shop_id" gorm:"References:shops(id)"`
	UserID int     `json:"user_id" gorm:"References:users(id)"`
	Rating float64 `json:"rating"`
}
