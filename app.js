require("dotenv").config()
const express = require("express")
const cors = require("cors")
const apiRouter = require("./routes/apiRoutes")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is up on port");
});

// Really good app.js file
