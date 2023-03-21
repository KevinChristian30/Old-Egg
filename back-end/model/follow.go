package model

import "gorm.io/gorm"

type Follow struct {
	gorm.Model
	UserID     uint `json:"user_id"`
	WishlistID uint `json:"wishlist_id"`
}
