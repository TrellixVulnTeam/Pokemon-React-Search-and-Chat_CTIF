const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const startSocket = require("./socket");
const app = express();
dotenv.config();

//? Notes
//? This limiter will limit an IPs amount of times it can make a request per window if time.
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    "You have made too many requests from this IP. Please try again in 60 minutes.",
});

//? Setting some misc useful headers - check doc for more options
app.use(helmet());

//? Limit request
app.use("/api", limiter);

//? Body parsers
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

//? Data sanitization against NoSQL query injects - checks body etc and filter out dollar signs and dots - removes mongo db operators
app.use(mongoSanitize());

//? Data sanitization against Cross site scripting attack - Clean any user input for malicious HTML code
app.use(xss());

// Imported the server and socket from another file
startSocket(app);

//! Mongo Connect
// Connect to mongo
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("CONNECTED to mongo")
);
