import express from "express";
import { getId } from "../util/key.js";
import { clients } from "./register.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//create
router.post("/api/clients", async (req, res) => {
  const { name, email } = req.body;

  try {
    const client = await clients.create({ name, email });
    res.json({
      status: 200,
      message: `Successfully created the following client!`,
      data: client,
    });
  } catch (error) {
    if (!name) {
      res.json({
        status: 400,
        message: `Every client must have a none-empty name!`,
      });
    } else if (!email) {
      res.json({
        status: 400,
        message: `Every client must have a none-empty email!`,
      });
    }
  }
});

//read
router.get("/api/clients", async (req, res) => {
  // TODO users must not get the clients data unless
  //  they provide a valid API Key
  const { key } = req.query;
  if (!key) {
    res.json({
      status: 400,
      message: `You must provide an API Key!`,
    });
  } else {
    try {
      const UUID = getId(key);
      const validation = await clients.read(UUID);
    } catch (err) {
      res.json({
        status: 403,
        message: `Invalid API key!`,
      });
    }
    const data = await clients.readAll();
    res.json({
      status: 200,
      message: `Successfully retrieved ${data.length} records!`,
      data: data,
    });
  }
});

//update
router.put("/api/clients", async (req, res) => {
  const { key } = req.query;
  const { name } = req.body;
  try {
    const UUID = getId(key);
    const valid = await clients.read(UUID);
    if (!valid) {
      res.json({
        status: 403,
        message: `There is no client with the given ID!`,
      });
    }
    const client = await clients.update(UUID, { name });
    res.json({
      status: 200,
      message: `Successfully updated the following client!`,
      data: client,
    });
  } catch (error) {
    res.json({
      status: 403,
      message: `Invalid API key!`,
    });
  }
});

//delete
router.delete("/api/clients", async (req, res) => {
  const { key } = req.query;
  try {
    const UUID = getId(key);
    const valid = await clients.read(UUID);
    if (!valid) {
      res.json({
        status: 403,
        message: `There is no client with the given ID!`,
      });
    }
    const client = await clients.delete(UUID);
    res.json({
      status: 200,
      message: `Successfully deleted the following cleint!`,
      data: client,
    });
  } catch (error) {
    res.json({
      status: 403,
      message: `Invalid API key!`,
    });
  }
});
export default router;
