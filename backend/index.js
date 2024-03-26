//MY IMPORTS
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { createServer } = require("node:http");

const app = express();
const server = createServer(app);

const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();

//Environmental Variables
const PORT = process.env.PORT || 3000;
const SOCKET_PORT = process.env.SOCKET_PORT || 8080;

//IMPORT ROUTES
const healthRoute = require("./routes/healthRoute");
const userRoute = require("./routes/userRoute");
const examRoute = require("./routes/examRoute");
const reportRoute = require("./routes/reportRoute");
const uploadRoute = require("./routes/uploadRoute");

//Global MiddleWares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static("public"));
app.use(cors());

// app.set('view engine','ejs')

// Multer file upload handler
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join("uploads", "Image");
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

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  // socket.join("me",socket.id);
  console.log(`User Connected: ${socket.id}`);

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", {
      signal: signalData,
      from,
      name,
    });
  });

  socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
    console.log("updateMyMedia");
    socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
  });

  socket.on("msgUser", ({ name, to, message, sender }) => {
    io.to(to).emit("msgRcv", { name, message, sender });
  });
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(data, "joioned");
  });

  socket.on("send_message", (data) => {
    socket.to(data.to).emit("receive_message", data);
    // console.log('mesg gaya' ,data.message);
  });

  socket.on("answerCall", (data) => {
    socket.broadcast.emit("updateUserMedia", {
      type: data.type,
      currentMediaStatus: data.myMediaStatus,
    });
    io.to(data.to).emit("callAccepted", data);
  });
  socket.on("endCall", ({ id }) => {
    io.to(id).emit("endCall");
  });
});

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

server.listen(SOCKET_PORT, () =>
  console.log(`Server is running on port ${SOCKET_PORT}`)
);
