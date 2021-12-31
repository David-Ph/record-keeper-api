import { Campaign, User } from "../models";

// seeder add
async function addCampaigns() {
  const user = await User.findOne().lean().select("_id");

  await Campaign.create({
    userId: user?._id,
    title: "Saltshaker's Campaign",
    status: "On Going",
    dungeonMaster: "Nazth",
    description: "Another day where the saltshakers mess everything up",
  });

  await Campaign.create({
    userId: user?._id,
    title: "Treefucqers's Campaign",
    status: "On Going",
    dungeonMaster: "Nazth",
    description: "Another day where the treefucqers adopts another o",
  });

  console.log("Campaigns has been seeded");
}

async function deleteCampaigns() {
  await Campaign.deleteMany();
  console.log("Campaigns has been deleted");
}

export { addCampaigns, deleteCampaigns };
