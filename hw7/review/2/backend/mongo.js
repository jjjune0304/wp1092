import ChatBoxModel from './models/ChatBoxModel.js';
import MessageModel from "./models/MessageModel.js";
import UserModel from './models/UserModel.js';
import mongoose from "mongoose";
import "dotenv-defaults/config.js";

// i use mongodb://localhost:27017/cardmongo for MONGO_URL

function connectMongo() {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Mongo database connected!');
    deleteDb();
  });
}

const deleteDb = async () => {
  await ChatBoxModel.deleteMany({});
  await MessageModel.deleteMany({});
  await UserModel.deleteMany({});
}

const mongo = {
  connect: connectMongo,
};

export default mongo;
