import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Pippo",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Pluto",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "LG Nano Led TV",
      slug: "lg-slim-tv",
      category: "Shirts",
      image: "/images/lg-tv.jpg",
      price: 1200,
      countInStock: 0,
      brand: "LG",
      rating: 4.5,
      numReviews: 10,
      description: "high quality TV",
    },
    {
      name: "Adidas Fit Shirt",
      slug: "adidas-fit-shirt",
      category: "Shirts",
      image: "/images/lg-tv.jpg",
      price: 250,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quality product",
    },
    {
      //_id: "6277bd166c429c42f255550f",
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pants",
      image: "/images/lg-tv.jpg",
      price: 25,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quality product",
    },
    {
      // _id: "6277bd168f6475658a374a49",
      name: "Adidas Fit Pant",
      slug: "adidas-fit-pant",
      category: "Pants",
      image: "/images/lg-tv.jpg",
      price: 65,
      countInStock: 5,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
  ],
};

export default data;
