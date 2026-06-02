import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
