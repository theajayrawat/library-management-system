import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    email: String,
    pass: String,
})

export const Users = mongoose.models.user || mongoose.model("user", UserModel);
