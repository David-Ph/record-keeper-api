import { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import { UserInterface } from "../../src/interfaces";

// declare global {
//   namespace Express {
//     export interface Request {
//       currentUser: UserInterface;
//     }
//   }
// }

// declare namespace Express {
//   export interface Request {
//     currentUser?: UserInterface;
//   }
// }

// declare module "express-serve-static-core" {
//   interface Request {
//     currentUser?: UserInterface;
//   }
//   interface Response {
//     currentUser?: UserInterface;
//   }
// }
