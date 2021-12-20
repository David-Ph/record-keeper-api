import { User } from "../models";

// seeder add
async function addUsers() {
  await User.create({
    username: "Saltshakers",
    email: "saltshakers@record-keeper.com",
    password: process.env.SALTSHAKER_PASSWORD,
    avatar:
      "https://w7.pngwing.com/pngs/948/158/png-transparent-digital-art-fan-art-others-art-technology-salt.png",
    isVerified: true,
  });

  await User.create({
    username: "Treefucqers",
    email: "treefucqers@record-keeper.com",
    password: process.env.TREEFUCQER_PASSWORD,
    avatar:
      "https://w1.pngwing.com/pngs/729/613/png-transparent-green-grass-tree-trunks-drawing-digital-art-fan-art-artist-art-blog-painting.png",
    isVerified: true,
  });

  console.log("Users has been seeded");
}

async function deleteUsers() {
  await User.deleteMany();
  console.log("Users has been deleted");
}

export { addUsers, deleteUsers };
