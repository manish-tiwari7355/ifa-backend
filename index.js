const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const routes = require("./routes");
// require("./services/passport");
const socketMessaging = require("./socket/messaging");

const { database } = require("./config/keys");
var cors = require("cors");
const corsOptions = {
  origin: [
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://ifa-admin-4406d.web.app",
    "https://ifa-admin-4406d.web.app/",
    "https://ifa-react-app.vercel.app/",
    "https://ifa-react-app.vercel.app",
    "https://fatehacademy.com/",
    "https://fatehacademy.com",
    "http://192.168.1.90:3001",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(morgan("combined"));

app.use(routes);

// app.use(passport.initialize());
// app.use(passport.session());

// Connect to MongoDB
mongoose.set("useCreateIndex", true);
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = process.env.PORT || 5001;

    http.listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} ${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(err));
