import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { User } from "../../models";
import nodemailer from "nodemailer";
import { generateCode, setEmailContent } from "../../config/EmailVerification";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

//? Logic to signup
const register = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("register", { session: false }, (err, user, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 401 });
    }

    if (!user) {
      return next({ message: err.message, statusCode: 401 });
    }

    req.currentUser = user;

    next();
  })(req, res, next);
};

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = await User.create(req.body);

        if (data) {
          const verificationCode = generateCode();
          const emailContent = setEmailContent(
            req.body.username,
            verificationCode,
            data._id.toString()
          );

          const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: data.email,
            subject: "Record Keeper Email Verification",
            text: emailContent,
          };

          data.verificationCode = verificationCode;
          await data.save();

          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              console.log("Email sent successfully");
            }
          });
        }

        return done(null, data, { message: "User can be created" });
      } catch (e) {
        return done(e, false, { message: "User can't be created" });
      }
    }
  )
);
//? End Logic to signup

//? Logic to signin
const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 401 });
    }

    if (!user) {
      return next({ message: info.message, statusCode: 401 });
    }

    req.currentUser = user;

    next();
  })(req, res, next);
};

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = await User.findOne({ email });

        if (!data) {
          return done(null, false, { message: "User not found!" });
        }

        const validate = await bcrypt.compare(password, data.password);

        if (!validate) {
          return done(null, false, { message: "Wrong password!" });
        }

        return done(null, data, { message: "Login success!" });
      } catch (e) {
        return done(e, false, { message: "User can't be created" });
      }
    }
  )
);
//? End Logic to login

// ? Logic for verifiedUser
const verifiedUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authorize("verifiedUser", { session: false }, (err, user, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 403 });
    }

    if (!user) {
      return next({ message: info.message, statusCode: 403 });
    }

    req.currentUser = user;

    next();
  })(req, res, next);
};

passport.use(
  "verifiedUser",
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const data = await User.findOne({ _id: token.user });

        if (data && data.isVerified) {
          return done(null, data);
        }

        return done(null, false, {
          message: "Forbidden access or Unverified Email",
        });
      } catch (error) {
        return done(error, false, { message: "Forbidden access" });
      }
    }
  )
);
// ? end of logic for verifiedUser

export { register, login, verifiedUser };
