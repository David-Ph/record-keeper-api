import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { User } from "../models";
import { addUsers, deleteUsers } from "../seeders/UserFactories";
let data: any;
let verifiedUser: any;
let verifiedUserToken: any;
let unVerifiedUser: any;
let unVerifiedUserToken: any;

beforeAll(async () => {
  await deleteUsers();
  await addUsers();

  data = await User.find();

  verifiedUser = await User.create({
    username: "Jack",
    email: "jack@gmail.com",
    password: "Oke12345!",
    verificationCode: "randomcode",
    isVerified: true,
  });

  unVerifiedUser = await User.create({
    username: "Jack",
    email: "jack_2@gmail.com",
    password: "Oke12345!",
  });

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Blank JWT secret");
  }

  verifiedUserToken = jwt.sign({ user: verifiedUser._id }, JWT_SECRET);
  unVerifiedUserToken = jwt.sign({ user: unVerifiedUser._id }, JWT_SECRET);
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

  it("Sign up should not succeed with invalid input", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      username: "@#",
      email: "",
      password: "",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("verificationCode and isValid should not be entered", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      username: "Jack",
      email: "jack_test@gmail.com",
      password: "Oke12345!",
      verificationCode: "should not work",
      isVerified: true,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("weak password", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      username: "Jack",
      email: "jack_test@gmail.com",
      password: "12345",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("User Login", () => {
  it("Login should succeed", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: data[0].email,
      password: process.env.SALTSHAKER_PASSWORD,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Login wrong password should fail", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: data[0].email,
      password: "random password",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Login no user found should fail", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "random@gmail.com",
      password: "random password",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Login invalid input should fail", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "",
      password: "",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("Get my profile", () => {
  it("Get user data should succeed", async () => {
    const res = await request(app)
      .get("/api/v1/auth/user")
      .set("Authorization", `Bearer ${verifiedUserToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Get unverified user data should fail", async () => {
    const res = await request(app)
      .get("/api/v1/auth/user")
      .set("Authorization", `Bearer ${unVerifiedUserToken}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("Update User", () => {
  it("update user should succeed", async () => {
    const res = await request(app)
      .put(`/api/v1/auth/edit`)
      .set("Authorization", `Bearer ${verifiedUserToken}`)
      .send({
        username: "mewusername",
        email: "newemail@email.com",
        password: "Oke1234567!",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("invalid input should not succeed", async () => {
    const res = await request(app)
      .put(`/api/v1/auth/edit`)
      .set("Authorization", `Bearer ${verifiedUserToken}`)
      .send({
        verificationCode: "randomcodethere",
        isVerified: true,
        username: "@#",
        email: "invalidemail",
        password: "12345",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("User Verification", () => {
  it("verify user should succeed", async () => {
    const res = await request(app)
      .get(
        `/api/v1/auth/verify/${verifiedUser._id}/${verifiedUser.verificationCode}`
      )

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("verify user with invalid code should fail", async () => {
    const res = await request(app)
      .get(
        `/api/v1/auth/verify/${verifiedUser._id}/notarealcode`
      )

    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("verify user not found should fail", async () => {
    const res = await request(app)
      .get(
        `/api/v1/auth/verify/5349b4ddd2781d08c09890f3/notarealcode`
      )

    expect(res.statusCode).toEqual(404);
    expect(res.body).toBeInstanceOf(Object);
  });
});
