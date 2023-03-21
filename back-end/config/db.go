package config

import (
	"github.com/KevinChristian30/OldEgg/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func migrate() {

	DB.AutoMigrate(&model.Role{})
	DB.AutoMigrate(&model.User{})
	DB.AutoMigrate(&model.Voucher{})
	DB.AutoMigrate(&model.Shop{})
	DB.AutoMigrate(&model.PromotionPicture{})
	DB.AutoMigrate(&model.ProductCategory{})
	DB.AutoMigrate(&model.Product{})
	DB.AutoMigrate(&model.ProductImageLink{})
	DB.AutoMigrate(&model.Notification{})
	DB.AutoMigrate(&model.OneTimeCode{})
	DB.AutoMigrate(&model.ShopRating{})
	DB.AutoMigrate(&model.SalesHeader{})
	DB.AutoMigrate(&model.SearchQuery{})
	DB.AutoMigrate(&model.Cart{})
	DB.AutoMigrate(&model.Wishlist{})
	DB.AutoMigrate(&model.WishlistDetail{})
	DB.AutoMigrate(&model.SavedForLaterItems{})
	DB.AutoMigrate(&model.Address{})
	DB.AutoMigrate(&model.DeliveryProvider{})
	DB.AutoMigrate(&model.PaymentMethod{})
	DB.AutoMigrate(&model.OrderHeader{})
	DB.AutoMigrate(&model.OrderDetail{})
	DB.AutoMigrate(&model.Message{})
	DB.AutoMigrate(&model.Review{})
	DB.AutoMigrate(&model.ProductPromotion{})
	DB.AutoMigrate(&model.Follow{})

}

func Connect() {

	dsn := "host=localhost user=postgres password=postgres dbname=newEgg port=5432 TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	DB = db

	migrate()

}
