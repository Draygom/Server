//print
console.log("UP and running!");

//API

//import from packages
const express = require("express");
const runMigrations = require("./infra/migrations");

//imports from other files
const authRouter = require("./routes/auth_route");

//init
const PORT = 3000;
const app = express();

//middleware
app.use(express.json());
app.use(authRouter);

//connections
runMigrations().then(() => {
  if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Connected at port ${PORT}`);
    });
  }
});

module.exports = app;
