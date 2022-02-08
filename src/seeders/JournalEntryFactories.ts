import { JournalEntry, Campaign, User } from "../models";

// seeder add
async function addJournalEntries() {
  const user = await User.findOne().lean().select("_id")!;
  const campaign = await Campaign.findOne().lean().select("_id");

  for (let i = 0; i < 10; i++) {
    await JournalEntry.create({
      userId: user?._id,
      campaignId: campaign?._id,
      title: "Saltix's death",
      body: "That day we were a little reckless. Saltix died",
      excerpt: "That day...",
    });

    await JournalEntry.create({
      userId: user?._id,
      campaignId: campaign?._id,
      title: "The coffee loving druid",
      body: "Few days after that, we met an old man who's casually drinking espresso in the middle of dragon attack",
      excerpt: "Few days after that...",
    });
  }

  console.log("JournalEntry has been seeded");
}

async function deleteJournalEntries() {
  await Campaign.deleteMany();
  console.log("JournalEntry has been deleted");
}

export { addJournalEntries, deleteJournalEntries };
