package model

import "gorm.io/gorm"

type Wishlist struct {
	gorm.Model
	UserID       int    `json:"user_id" gorm:"primary_key References:users(ID)"`
	WishListName string `json:"wishlist_name"`
}
