import path from "path";
import * as dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});
import { addUsers, deleteUsers } from "./UserFactories";

async function add() {
  await addUsers();
}

async function remove() {
  await deleteUsers();
}

if (process.argv[2] === "add") {
  add().then(() => {
    console.log("Seeders success");
    process.exit(0);
  });
} else if (process.argv[2] === "remove") {
  remove().then(() => {
    console.log("Delete data success");
    process.exit(0);
  });
}
