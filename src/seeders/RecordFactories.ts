import { Record, Category, User } from "../models";

// seeder add
async function addRecord() {
  const user = await User.findOne().lean().select("_id")!;
  const category = await Category.findOne().lean().select("_id");

  await Record.create({
    userId: user?._id,
    categoryId: category?._id,
    title: "Loot we stole from the dragon today",
    description: "WE'RE FILTHY RICH",
    status: "Normal",
  });

  await Record.create({
    userId: user?._id,
    categoryId: category?._id,
    title: "Wolf",
    description: "Wolf is an ass",
    status: "Normal",
  });

  console.log("Record has been seeded");
}

async function deleteRecord() {
  await Record.deleteMany();
  console.log("Record has been deleted");
}

export { addRecord, deleteRecord };
