import express from "express";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(router);

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${res.url}`);
  next();
};

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 10000, signed: true });
  res.status(201).send({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
