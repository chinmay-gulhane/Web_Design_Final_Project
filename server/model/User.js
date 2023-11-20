import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    }
})

const User = mongoose.model("user", userSchema);

export default User;

