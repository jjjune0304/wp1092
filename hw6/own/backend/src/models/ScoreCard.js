import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const scoreCardSchema = new Schema({
    name   : String,
    subject: String,
    score  : Number
});

export default model('ScoreCard', scoreCardSchema);
