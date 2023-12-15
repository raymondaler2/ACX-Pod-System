require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sopRoute = require("./view/sop");
const sopServiceTagRoute = require("./view/sopServiceTag");
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

app.use("/api/sop", sopRoute);
app.use("/api/sopServiceTag", sopServiceTagRoute);

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`Connected to sopDB`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`sopDB Error:`, error);
  });
