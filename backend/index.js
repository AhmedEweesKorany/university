const express = require("express");
const app = express();
// adding dependencies
const cors = require("cors");
const bodyParser = require("body-parser")
require("dotenv").config();

//aplying middelwars
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(process.env.PORT || 4010, () => {
  console.log("server is ruunnig now on http://localhost:4010");
});
