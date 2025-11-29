import type e = require("express");

const express = require("express");

const helloRoute = require("./routes/hello.route.ts");
const userRoute = require("./routes/user.route.ts");
const connectDB = require("./db/init");

require("dotenv").config();

const app = express();
const port = 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.use(express.json());

    app.use("/api/hello", helloRoute);
    app.use("/api/user", userRoute);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch(error) {
    console.log("[ERROR] failed to connect to the Database: ", error);
  }
}

startServer();
