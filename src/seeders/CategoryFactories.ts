import { Category, Campaign, User } from "../models";

// seeder add
async function addCategory() {
  const user = await User.findOne().lean().select("_id")!;
  const campaign = await Campaign.findOne().lean().select("_id");

  for (let i = 0; i < 3; i++) {
    await Category.create({
      userId: user?._id,
      campaignId: campaign?._id,
      name: "People we met",
      type: "Misc",
      color: "#ffffff",
    });

    await Category.create({
      userId: user?._id,
      campaignId: campaign?._id,
      name: "People we killed",
      type: "Misc",
      color: "#000000",
    });
  }

  console.log("Category has been seeded");
}

async function deleteCategory() {
  await Category.deleteMany();
  console.log("Category has been deleted");
}

export { addCategory, deleteCategory };
