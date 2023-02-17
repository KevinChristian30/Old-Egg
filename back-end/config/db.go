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
