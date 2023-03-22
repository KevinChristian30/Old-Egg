package model

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	UserID      uint   `json:"user_id" gorm:"References:users(ID)"`
	WishlistID  uint   `json:"wishlist_id" gorm:"References:wishlists(ID)"`
	Comment     string `json:"comment"`
	IsAnonymous bool   `json:"is_anonymous"`
}
