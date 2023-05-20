//print
console.log("UP and running!");

//API

//import from packages
const express = require("express");
const mongoose = require("mongoose");

//imports from other files
const authRouter = require("./routes/auth");
const Password = require("./dbpassword");

//init HZWf0k8lhSFZGzsx
const PORT = 3000;
const app = express();
const DB = `mongodb+srv://tester:${Password}@server.uugwpn8.mongodb.net/?retryWrites=true&w=majority`;

//middleware
app.use(express.json());
app.use(authRouter);

//connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Conexão bem sucedida!");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Connected at port ${PORT}`);
});
