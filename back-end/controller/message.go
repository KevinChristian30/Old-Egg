package controller

import (
	"fmt"
	"net/http"

	"github.com/KevinChristian30/OldEgg/config"
	"github.com/KevinChristian30/OldEgg/model"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var conns = map[string]*websocket.Conn{}

func SendingMessage(c *gin.Context) {

	var ReqFrom string
	h := http.Header{}
	fmt.Println("connected")
	fmt.Println(h)

	for _, sub := range websocket.Subprotocols(c.Request) {

		h.Set("Sec-Websocket-Protocol", sub)
		fmt.Println(sub)
		ReqFrom = sub
		fmt.Println(sub)

	}

	// Upgrading HTTP Request Method to Web Socket
	ws, err := upgrader.Upgrade(c.Writer, c.Request, h)

	if err != nil {
		fmt.Println(err)
	}

	conns[ReqFrom] = ws
	for {

		var req model.Message
		_ = ws.ReadJSON(&req)
		if req.From != "" {

			config.DB.Create(&req)

		}

		conns[req.From] = ws
		if con, ok := conns[req.To]; ok {

			err = con.WriteJSON(&req)

			if err != nil {

				fmt.Println(err)

			}

		}

		if con, ok := conns[req.From]; ok {

			err = con.WriteJSON(&req)

			if err != nil {

				fmt.Println(err)

			}

		}

	}

}

func GetAllMsg(c *gin.Context) {

	messages := []model.Message{}
	config.DB.Find(&messages)
	c.JSON(200, &messages)

}
