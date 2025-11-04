import type e = require("express");

const express = require("express");

const helloRoute = require("./routes/hello.route.ts");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/hello", helloRoute);
app.use("/api/user", helloRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
