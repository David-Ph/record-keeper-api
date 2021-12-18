import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserInterface } from "../interfaces/models/UserInterface";

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    username: {
      type: String,
      required: [true, "Username can't be empty"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email can't be empty"],
    },
    password: {
      type: String,
      required: [true, "Password can't be empty"],
      set: setPassword,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/davidph223/image/upload/v1639466353/records-keeper/14-147008_d-d-5th-edition-logo-latest-dd-logo_uvgoj8.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: {
      versionKey: false,
    },
  }
);

function setPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

const User = mongoose.model<UserInterface>("User", UserSchema);

export { User };
