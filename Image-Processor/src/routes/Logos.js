import express from "express";
import fs from "fs";
import { resize } from "../imageProcessor.js";

const router = express.Router();

router.get("/:uni/:color/:size", (req, res) => {
  const { uni, color, size } = req.params;
  if (fs.existsSync(`assets/${uni}`)) {
    if (fs.existsSync(`assets/${uni}/${color}.png`)) {
      if (size >= 20 && size <= 500) {
        resize(`assets/${uni}/${color}.png`, parseInt(size), res, uni, color);
      } else {
        res
          .status(401)
          .send({ message: "We can't process size < 20 or size > 500" });
      }
    } else {
      res
        .status(401)
        .send({ message: "We don't have the logo in the color requested!" });
    }
  } else {
    res
      .status(401)
      .send({ message: "We don't have a logo for this university!" });
  }
});

router.get("/*", async (req, res) => {
  res.status(404).send({
    message: "GET " + req.originalUrl + " is not supported by the API",
  });
});

export default router;
