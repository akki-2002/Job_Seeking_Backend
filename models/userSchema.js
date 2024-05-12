import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name!"],
        minLength: [3, "Name must contain at least 3 characters!"],
        maxLength: [30, "Name cannnot exceed 30 characters!"],

    },

    email:{
        type: String,
        required: [true, "Please provide your Email!"],
        validate: [validator.isEmail, "Please provide a valid email!"],
    },

    phone:{
        type: Number,
        required: [true, "Please provide your phone number"]
    },

    password:{
        type: String,
        required: [true, "Please provide your password!"],
        minLength: [8, "Name must contain at least 8 characters!"],
        maxLength: [32, "Name cannnot exceed 32 characters!"],
        select: false

    },

    role:{
        type: String,
        required: [true, "Please provide your role"],
        enum: [ "Job Seeker", "Employer"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});


//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  //COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  //GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

  export const User = mongoose.model("User", userSchema);