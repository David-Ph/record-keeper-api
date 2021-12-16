import { Document, Types } from "mongoose";

export interface UserInterface extends Document {
  _id: Types.ObjectId;
  username: string;
  avatar: string;
  email: string;
  password: string;
  isValid: boolean;
  verificationCode: string;
}
