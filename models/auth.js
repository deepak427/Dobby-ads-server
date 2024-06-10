import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  mainFolder: {type: Schema.Types.ObjectId, ref: "FolderDobbyAds"},
});

export default mongoose.model("UserDobbyAds", userSchema);
