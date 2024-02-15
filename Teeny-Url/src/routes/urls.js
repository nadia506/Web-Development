import express from "express";
import TeenyUrlDao from "../data/TeenyUrlDao.js";
import { factory } from "../util/debug.js";
import TeenyUrl from "../model/TeenyUrl.js";
import path from "path";
import ApiError from "../model/ApiError.js";

const link = path.resolve();
const debug = factory(import.meta.url);
const router = express.Router();

const teenyUrlDao = new TeenyUrlDao();

const endpoint = "/urls";

router.get(`${endpoint}`, async (req, res, next) => {
  return next(new ApiError(405, "Method Not Allowed"));
});

router.get(`${endpoint}/:id`, async (req, res, next) => {
  debug(`${req.method} ${req.path} called...`);
  try {
    let short = "http://localhost:3000/";
    const { id } = req.params;
    const teenyUrl = await teenyUrlDao.read(id);
    short += teenyUrl.key;
    debug(`Preparing the response payload...`);
    res.json({
      status: 200,
      message: "Successfully retrieved the following teeny-url!",
      data: {
        id: teenyUrl._id,
        long: teenyUrl.url,
        key: teenyUrl.key,
        short: short,
      },
    });
    debug(`Done with ${req.method} ${req.path}`);
  } catch (err) {
    debug(`There was an error processing ${req.method} ${req.path} `);
    next(err);
  }
});

router.post(`${endpoint}`, async (req, res, next) => {
  debug(`${req.method} ${req.path} called...`);
  let short = "http://localhost:3000/";
  try {
    const { url } = req.body;
    let teenyUrls = await TeenyUrl.find({ url });
    if (teenyUrls.length >= 1) {
      short += teenyUrls[0].key;
      res.status(400).json({
        status: 400,
        message: "This url is already mapped!",
        data: {
          long: url,
          key: teenyUrls[0].key,
          short: short,
        },
      });
    } else {
      const teenyUrl = await teenyUrlDao.create(url);
      short += teenyUrl.key;

      short.match(teenyUrl.url);
      debug(`Preparing the response payload...`);
      res.status(201).json({
        status: 201,
        message: "Successfully created the following teeny-url!",
        data: {
          id: teenyUrl._id,
          long: teenyUrl.url,
          key: teenyUrl.key,
          short: short,
        },
      });
    }
    debug(`Done with ${req.method} ${req.path}`);
  } catch (err) {
    debug(`There was an error processing ${req.method} ${req.path} `);
    next(err);
  }
});

router.put(`${endpoint}/:id`, async (req, res, next) => {
  return next(new ApiError(405, "Method Not Allowed"));
});

router.delete(`${endpoint}/:id`, async (req, res, next) => {
  debug(`${req.method} ${req.path} called...`);
  let short = "http://localhost:3000/";
  try {
    const { id } = req.params;
    const deleted = await teenyUrlDao.delete(id);
    short += deleted.key;
    debug(`Preparing the response payload...`);
    res.status(200).json({
      status: 200,
      message: "Successfully deleted the following teeny-url!",
      data: {
        id: deleted._id,
        long: deleted.url,
        key: deleted.key,
        short: short,
      },
    });
    debug(`Done with ${req.method} ${req.path}`);
  } catch (err) {
    debug(`There was an error processing ${req.method} ${req.path} `);
    next(err);
  }
});

router.get("/:key", async (req, res, next) => {
  debug(`${req.method} ${req.path} called...`);
  try {
    const { key } = req.params;
    const result = await teenyUrlDao.readAll({ key });
    res.writeHead(302, {
      location: result[0].url,
    });
    res.end();
  } catch (err) {
    res.status(404).sendFile(link + "/assets/404.html");
  }
});

router.delete("/:key", async (req, res, next) => {
  res.status(404).sendFile(link + "/assets/404.html");
});

export default router;
