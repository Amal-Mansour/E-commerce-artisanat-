console.clear();
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// create the Routes
app.use("/user", require("./Routes/userRouter"));
app.use("/api", require("./Routes/categoryRouter"));
app.use("/api", require("./Routes/upload"));
app.use("/api", require("./Routes/ProductsRouter"));

// connnect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB atlas");
  }
);

app.get("/", (req, res) => {
  res.send({ msg: "wellcome to my app" });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server is running on port http://localehost", PORT);
});
