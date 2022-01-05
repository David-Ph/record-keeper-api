import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { User } from "../models";
import { UserInterface } from "../interfaces";
import { addUsers, deleteUsers } from "../seeders/UserFactories";
let data;
let user_token;

beforeAll(async () => {
  await deleteUsers();
  await addUsers();

  data = await User.find();

  const user1 = await User.create({
    username: "Jack",
    email: "jack@gmail.com",
    password: "Oke12345!",
  });

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Blank JWT secret");
  }

  user_token = jwt.sign({ user: user1._id }, JWT_SECRET);
});

describe("User Signup", () => {
  it("Sign up should succeed", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      username: "Jack",
      email: "jack_test@gmail.com",
      password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("User Signin", () => {
  // it("Signin success", async () => {
  //   const res = await request(app).post("/user/login").send({
  //     user_email: data[0].user_email,
  //     user_password: "Oke12345!",
  //   });
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toBeInstanceOf(Object);
  // });
});

describe("Get my profile", () => {
  // it("get my profil success", async () => {
  //   const res = await request(app)
  //     .get("/user/getprofil")
  //     .set("Authorization", `Bearer ${user_token}`);
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toBeInstanceOf(Object);
  // });
});

describe("Update User", () => {
  //   it("updateUser success", async () => {
  //     const res = await request(app)
  //       .put(`/user/edit`)
  //       .set("Authorization", `Bearer ${user_token}`)
  //       .send({
  //         user_fullname: faker.name.findName(),
  //         user_email: faker.internet.email(),
  //         user_birthday: "1990-03-27",
  //         user_password: "Oke123456!",
  //         user_old_password: "Oke12345!",
  //       });
  //     expect(res.statusCode).toEqual(201);
  //     expect(res.body).toBeInstanceOf(Object);
  //   });
});
