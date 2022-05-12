import express from "express";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import data from "../data.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.removeMany({});
  const createdProducts = await Product.insertMany(data.products);
  await User.removeMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});

export default seedRouter;
