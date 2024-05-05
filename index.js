const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/db_connection");
const path = require("path");

//env config
dotenv.config();

//route import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDb();
//rest object
const app = express();

//moddelwere
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//statics file

app.use(express.static(path.join(__dirname, "./clint/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./clint/build/index.html"));
});

//port

const PORT = process.env.PORT || 8080;

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
//listen

app.listen(PORT, () => {
  console.log(
    `server is started ${process.env.DEV_MODE}on port${PORT}`.bgCyan.white
  );
});
