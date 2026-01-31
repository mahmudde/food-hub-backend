import express, { Application } from "express";
import router from "./modules/auth/auth.route";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World....");
});

app.use("/api/v1/auth", router);

export default app;
