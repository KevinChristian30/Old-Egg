package model

import "gorm.io/gorm"

type CustomerServiceReview struct {
	gorm.Model
	UserID  uint   `json:"user_id" gorm:"References:users(ID)"`
	Comment string `json:"review"`
}
