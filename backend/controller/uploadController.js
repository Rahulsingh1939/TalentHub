const userModel = require("../models/user");
// Creating new file and text analyze controller
const createNewFile = async (req, res) => {
  if (!req.file) {
    console.error("No image file provided");
    const error = new Error("No image file provided!");
    error.statusCode = 422;
    throw error;
  }
  const { userId } = req.body;
  const imageUrl = req.file.path;
  console.log("File uploaded at this path: ", imageUrl);
  const updatedUser = await userModel.findOneAndUpdate(
    {
      _id: userId,
    },
    { imageUrl: imageUrl },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(401).send({ message: "User not found", success: false });
  }
  return res
    .status(201)
    .send({ message: "Image Added Successfully", success: true });
};

// Fetching all created image files controller
const getFiles = async (req, res, next) => {
  try {
    const images = await Images.find();
    res
      .status(200)
      .json({ message: "Fetching all images files successful!", images });
    console.log("Fetching image files successfull");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.error(err);
    next(err);
  }
};

module.exports = { getFiles, createNewFile };
