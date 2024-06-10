import mongoose, { Schema } from "mongoose";

const folderSchema = mongoose.Schema({
  name: { type: String },
  images: [{ type: String }],
  imagesName: [{type: String}],
  child: [{ type: Schema.Types.ObjectId, ref: "FolderDobbyAds" }],
  childName: [{type: String}]
});

export default mongoose.model("FolderDobbyAds", folderSchema);
