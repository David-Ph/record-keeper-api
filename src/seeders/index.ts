import path from "path";
import * as dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});
import { addUsers, deleteUsers } from "./UserFactories";
import { addCampaigns, deleteCampaigns } from "./CampaignFactories";
import { addCategory, deleteCategory } from "./CategoryFactories";
import { addRecord, deleteRecord } from "./RecordFactories";
import {
  addJournalEntries,
  deleteJournalEntries,
} from "./JournalEntryFactories";

async function add() {
  await addUsers();
  await addCampaigns();
  await addJournalEntries();
  await addCategory();
  await addRecord();
}

async function remove() {
  await Promise.all([
    deleteUsers(),
    deleteCampaigns(),
    deleteJournalEntries(),
    deleteCategory(),
    deleteRecord(),
  ]);
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
