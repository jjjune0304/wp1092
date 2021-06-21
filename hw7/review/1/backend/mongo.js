// import mongoose from 'mongoose';

const mongoose = require('mongoose');
const dotenv = require('dotenv-defaults');

// i use mongodb://localhost:27017/cardmongo for MONGO_URL

function connectMongo() {
  dotenv.config();
  if(!process.env.MONGO_URL){
    console.log('Missing MONGO_URL!')
    process.exit(i);
  }
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Mongo database connected!');
  });
}

const mongo = {
  connect: connectMongo,
};

module.exports = mongo;
