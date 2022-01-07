import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { Campaign, User } from "../models";
import { addCampaigns, deleteCampaigns } from "../seeders/CampaignFactories";
import { addUsers, deleteUsers } from "../seeders/UserFactories";
let data: any;
let verifiedUser: any;
let verifiedUserToken: any;

beforeAll(async () => {
  await Promise.all([deleteUsers(), deleteCampaigns()]);
  await addUsers();
  await addCampaigns();

  data = await User.find();

  verifiedUser = await User.create({
    username: "Jack",
    email: "jack@gmail.com",
    password: "Oke12345!",
    verificationCode: "randomcode",
    isVerified: true,
  });

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Blank JWT secret");
  }

  verifiedUserToken = jwt.sign({ user: verifiedUser._id }, JWT_SECRET);
});

describe("POST Campaign", () => {
  it("Creating a campaign should succeed", async () => {
    const res = await request(app)
      .post("/api/v1/campaign")
      .send({
        title: "New Campaign",
        status: "Completed",
        dungeonMaster: "Nazth",
        description: "Our New Campaign",
      })
      .set("Authorization", `Bearer ${verifiedUserToken}`);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Creating a campaign invalid input should not succeed", async () => {
    const res = await request(app)
      .post("/api/v1/campaign")
      .send({
        title:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum est doloremque, vero impedit eos dolorum distinctio quo? Cumque impedit dolorum, expedita similique eius voluptas tempore! Doloribus quasi iure sunt non. vero impedit eos dolorum dolorum dolorum",
        status: "",
        dungeonMaster:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum est doloremque, vero impedit eos dolorum distinctio quo? Cumque impedit dolorum, expedita similique eius voluptas tempore! Doloribus quasi iure sunt non. vero impedit eos dolorum dolorum dolorum",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum est doloremque, vero impedit eos dolorum distinctio quo? Cumque impedit dolorum, expedita similique eius voluptas tempore! Doloribus quasi iure sunt non. vero impedit eos dolorum dolorum dolorum",
      })
      .set("Authorization", `Bearer ${verifiedUserToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Creating a campaign without user token should not succeed", async () => {
    const res = await request(app).post("/api/v1/campaign").send({
      title: "New Campaign",
      status: "Completed",
      dungeonMaster: "Nazth",
      description: "Our New Campaign",
    });

    expect(res.statusCode).toEqual(403);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("GET Campaign", () => {
  it("Get currently logged in user campaigns should succeed", async () => {
    const res = await request(app)
      .get("/api/v1/campaign")
      .set("Authorization", `Bearer ${verifiedUserToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Get currently logged in user campaigns without user token should not succeed", async () => {
    const res = await request(app).get("/api/v1/campaign");

    expect(res.statusCode).toEqual(403);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Get currently logged in user campaigns with params should succeed", async () => {
    const res = await request(app)
      .get(
        "/api/v1/campaign?page=1&limit=1&sort=title&order=asc&status=Completed&search=a"
      )
      .set("Authorization", `Bearer ${verifiedUserToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Get one specific campaign", async () => {
    const campaign = await Campaign.findOne({ userId: verifiedUser._id })!;
    const res = await request(app)
      .get(`/api/v1/campaign/${campaign?._id}`)
      .set("Authorization", `Bearer ${verifiedUserToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});
