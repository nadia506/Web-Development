import express from "express";
import Logos from "./src/routes/Logos.js";
import path from "path";

const link = path.resolve();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(link + "/default.html");
});
app.use(Logos);

app.listen(PORT, () => {
  console.log(`Bookmark API at http://localhost:${PORT}/`);
});
