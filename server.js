require("dotenv").config();
const express = require("express");
const UserRouter = require("./routes/users");
const ProductRouter = require("./routes/products");
const SecurityRouter = require("./routes/security");
const checkAuth = require("./middlewares/checkAuth");

const app = express();

app.use(express.json());

app.use(SecurityRouter);
app.use("/users", UserRouter);
app.use("/products", checkAuth, ProductRouter);

app.listen(process.env.PORT, () =>
  console.log("Server listening on port " + process.env.PORT)
);