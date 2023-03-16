package model

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	UserID         uint   `json:"user_id" gorm:"References:users(ID)"`
	OrderDetailID  uint   `json:"order_detail_id" gorm:"References:order_details(ID)"`
	Rating         int    `json:"rating"`
	Details        string `json:"details"`
	CountHelpful   int    `json:"count_helpful"`
	CountUnhelpful int    `json:"count_unhelpful"`
}
