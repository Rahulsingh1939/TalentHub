//MY IMPORTS
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();

//Environmental Variables
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

//
const healthRoute = require("./routes/healthRoute");
const userRoute = require("./routes/userRoute");
const examRoute = require("./routes/examRoute");
const reportRoute = require("./routes/reportRoute");
const uploadRoute = require("./routes/uploadRoute");

//Global MiddleWares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static("public"));
app.use(cors());

// app.set('view engine','ejs')

// Multer file upload handler
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath =  path.join("uploads", "Image");
    // Create the uploads directory if it doesn't exist
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, ""));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true); // Allow upload for text/plain MIME type
  } else {
    cb(null, false); // Reject upload for other MIME types
  }
};

app.get("/", (req, res) => {
  res.json({ status: "Success", message: "Everything Fine" });
});

//Middlewares for Multer
app.use(
  "/uploads/Image",
  express.static(path.join(__dirname, path.join("uploads", "Image")))
);
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("file")
);

// ROUTES
app.use("/api/v1/user", userRoute);
app.use("/api/v1/report", reportRoute);
app.use("/api/v1/exams", examRoute);
app.use("/api/health", healthRoute);
app.use("/api/v1/upload", uploadRoute);

//APP LISTENING ON PORT
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    console.log("Error Occured");
  } else {
    console.log(`Server Up On ${PORT}`);
  }
});
