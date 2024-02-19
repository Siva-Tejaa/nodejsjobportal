require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const authRouter = require("./routers/authRouter");
const testRouter = require("./routers/testRouter");

const userRouter = require("./routers/userRouter");

const homeRouter = require("./routers/homeRouter");

const jobsRouter = require("./routers/jobsRoute");

const notFoundRouter = require("./routers/notFoundRouter");

const connectDB = require("./config/dbConfig");

//cors for frontend access
app.use(cors());

//Middlewares
app.use(express.json());

app.use("/", homeRouter);

app.use("/", authRouter);

app.use("/", testRouter);

app.use("/", userRouter);

app.use("/", jobsRouter);

app.use("*", notFoundRouter);

const port = 8080;
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is Running on Port ${port}`);
});
