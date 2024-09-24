require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const i18nextMiddleware = require("./middlewares/translate");
const formatOutput = require("./middlewares/format");
const hateoas = require("./middlewares/hateoas");
const UserRouter = require("./routes/users");
const GameRouter = require("./routes/game");

const app = express();

app.use(bodyParser.json());
app.use(i18nextMiddleware);
app.use(formatOutput);
app.use(hateoas);

app.use("/users", UserRouter);
app.use("/game", GameRouter);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log("Server listening on port " + port)
);