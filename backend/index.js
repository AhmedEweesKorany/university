const express = require("express");
const app = express();
// adding dependencies
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
const bodyParser = require("body-parser");
require("dotenv").config();
const portNum = process.env.PORT || 4010;
//aplying middelwars
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(router);

app.listen(portNum, () => {
  console.log(`server is ruunnig now on http://localhost:${portNum}`);
});
