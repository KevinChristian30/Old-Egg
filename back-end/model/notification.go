package model

import "gorm.io/gorm"

type Notification struct {
	gorm.Model
	UserID              int    `json:"user_id" gorm:"References:users(ID)"`
	NotificationHeader  string `json:"notification_header"`
	NotificationDetails string `json:"notification_details"`
}
