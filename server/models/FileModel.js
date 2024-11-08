import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  url: { type: String, required: true },
});

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;
