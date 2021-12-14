import { Request, Response } from "express";
import { UserInterface } from "../models/UserInterface";

export interface AuthRequestInterface extends Request {
  user: UserInterface;
}
