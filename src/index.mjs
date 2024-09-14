import express from "express";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.mjs";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./strategies/discord-strategy.mjs";

const app = express();

mongoose
  .connect("mongodb://localhost/express_tutorial")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error : ${err}`));

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "john is the dev",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
