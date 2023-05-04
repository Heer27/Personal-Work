const express = require("express");
const cors = require("cors");
// const nodemailer = require("nodemailer");
// const details = require("./details.json");

const app = express();

const db = require("./app/models");
db.sequelize.sync();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./app/routes/employee.routes")(app);

const PORT = process.env.PORT || 5000;
var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;