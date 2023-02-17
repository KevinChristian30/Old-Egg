package model

import "gorm.io/gorm"

type PromotionPicture struct {
	gorm.Model
	URL string `json:"url"`
}
