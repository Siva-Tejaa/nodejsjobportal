//Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");

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

//Security Packages
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");

//IP Limiter
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

//Swagger API Config
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Job Portal Application",
      description: "descof application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(limiter);

app.use("/", homeRouter);

app.use("/", authRouter);

app.use("/", testRouter);

app.use("/", userRouter);

app.use("/", jobsRouter);

//Swagger Root HomePage
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(spec));

app.use("*", notFoundRouter);

const port = 8080;
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is Running on Port ${port}...`);
});
