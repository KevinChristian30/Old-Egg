package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName                           string `json:"first_name"`
	LastName                            string `json:"last_name"`
	Email                               string `json:"email"`
	MobilePhoneNumber                   string `json:"mobile_phone_number"`
	Password                            string `json:"password"`
	Role                                int    `json:"role"`
	SubscribedToEmailOffersAndDiscounts bool   `json:"subscribed_to_email_offers_and_discounts"`
}
