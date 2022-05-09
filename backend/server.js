import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import data from './api/data.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();


mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test
app.get('/api/products', (req, res) => {
  res.send(data.products);
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

/*
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";


const app = express();



app.get('/api/products', (req, res) => {
  res.send(data.products);
});

/*
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/keys/google", (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || "" });
});

app.use("/api/upload", uploadRouter);
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

*/

app.use("*", (req, res) => res.status(404).json({ error: "not found"}))
