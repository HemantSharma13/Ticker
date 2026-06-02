import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/login", (req, res) => {
  console.log("The request body is :", req.body);
  setTimeout(
    () =>
      res
        .status(200)
        .json({ status: "success", message: "Login Successful!!" }),
    2000,
  );
});

export default app;
