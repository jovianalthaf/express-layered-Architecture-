import express from 'express';
import dotenv from 'dotenv';
import productRoute from './routes/productRoutes.js'
import authRoute from './routes/authRoutes.js'


const app = express();


dotenv.config();
const PORT = process.env.PORT;
app.use(express.json())

app.get("/api", (req, res) => {
    res.send("welcome to my test");
});

app.use(productRoute);
app.use(authRoute);

app.listen(PORT, () => {
    console.log("Express API Running in : " + PORT);
});
