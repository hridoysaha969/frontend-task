import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cloudinary from "./config/cloudinaryConfig.js";
import File from "./models/FileModel.js";
import connectDB from "./config/mongodb.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

// APP CONFIG
const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

// MIDDLEWERE
app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json({ success: true, result: files });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, result: [] });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    const fileExt = req.file.originalname.split(".").pop();
    const fileName = `${req.file.originalname
      .split(".")
      .slice(0, -1)
      .join(".")}.${fileExt}`;

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      public_id: fileName,
      use_filename: true,
      unique_filename: false,
    });

    const newFile = new File({
      fileName: fileName,
      url: result.secure_url,
    });

    await newFile.save();

    res.json({
      success: true,
      message: "File uploaded",
      url: result.secure_url,
    });

    // res.json({ success: true, fileName });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Failed to upload file" });
  }
});

app.listen(PORT, () => {
  console.log("Server runnung on port : " + PORT);
});
