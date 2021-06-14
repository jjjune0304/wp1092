// i use mongodb://localhost:27017/cardmongo for MONGO_URL
const WebSocket = require("ws");
require("dotenv-defaults").config();
const mongoose = require("mongoose");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const wssConnect = (ws) => {
  const sendData = (data) => {
    ws.send(JSON.stringify(data));
  };
  const sendStatus = (payload) => {
    sendData(["status", payload]);
  };
  ws.onmessage = async (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    switch (task) {
      case "input": {
        const { name, body } = payload;
        const message = new Message({ name, body });
        try {
          await message.save();
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }
        sendData(["output", [payload]]);
        sendStatus({
          type: "success",
          msg: "Message sent.",
        });
        break;
      }
      case "clear": {
        Message.deleteMany({}, () => {
          sendData(["cleared"]);
          sendStatus({ type: "info", msg: "Message cache cleared." });
        });
        break;
      }
      default:
        break;
    }
  };
  Message.find()
    .sort({ created_at: -1 })
    .limit(100)
    .exec((err, res) => {
      if (err) throw err;
      // initialize app with existing messages
      sendData(["init", res]);
    });
};

function connectMongo() {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Mongo database connected!");

    wss.on("connection", wssConnect);
    const PORT = process.env.port || 4000;
    server.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  });
}

const mongo = {
  connect: connectMongo,
};

module.exports = mongo;
