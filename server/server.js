import { configDotenv } from "dotenv";
configDotenv({ path: "./config.env" }); //configuring dotenv
import mongoose from "mongoose";
import app from "./app.js";

const port = process.env.SERVER_PORT_NUMBER || 3000;
console.log("Gemini Key at server:", process.env.GEMINI_API_KEY);
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
