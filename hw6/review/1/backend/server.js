import express from 'express';
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
}).then((res) => console.log("mongo db connection created"))
const app = express();
const port = process.env.PORT || 4000;
app.get('/' , (reg, res) => {
	res.send('Hello, World!');
});
app.listen(port, () =>
	console.log(`Example app listening on port ${port}!`),
);