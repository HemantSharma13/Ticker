import app from "./app.js";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv({ path: "./config.env" }); //configuring dotenv
console.log("The port is", process.env.SERVER_PORT_NUMBER);
const port = process.env.SERVER_PORT_NUMBER || 3000;

mongoose
  .connect(
    process.env.MONGO_CONNECTION_STRING.replace(
      "<PASSWORD>",
      process.env.MONGO_PASSWORD,
    ),
  )
  .then(() => console.log("DB connection successful!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
