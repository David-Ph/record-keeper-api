import { UserInterface } from "../../src/interfaces";
import { Express } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    currentUser?: UserInterface;
  }
}

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
