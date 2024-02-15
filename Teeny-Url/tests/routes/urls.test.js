import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import TeenyUrlDao from "../../src/data/TeenyUrlDao.js";
import { faker } from "@faker-js/faker";
import TeenyUrl from "../../src/model/TeenyUrl.js";
import * as db from "../../src/data/db.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/index.js";

dotenv.config();
const teenyUrlDao = new TeenyUrlDao();
const endpoint = "/urls";
const request = new supertest(app);

const numTeenyUrls = 5;
let teenyUrls;

describe(`Test ${endpoint}`, () => {
  beforeAll(async () => {
    db.connect(process.env.DB_TEST_URI);
    await teenyUrlDao.deleteAll();
  });

  beforeEach(async () => {
    await teenyUrlDao.deleteAll();
    teenyUrls = [];
    for (let index = 0; index < numTeenyUrls; index++) {
      const url = faker.internet.url();
      const key = `teenyurl${index + 1}`;
      const teenyUrl = await TeenyUrl.create({ url, key });
      teenyUrls.push(teenyUrl);
    }
  });

  describe("GET request", () => {
    it("Respond 405", async () => {
      const response = await request.get(endpoint);
      expect(response.status).toBe(405);
    });
  });

  describe("POST request", () => {
    it("Respond 201", async () => {
      const url = faker.internet.url();
      const response = await request.post(endpoint).send({ url });
      expect(response.status).toBe(201);
    });

    describe("Respond 400", () => {
      it("Empty url", async () => {
        const url = "";
        const response = await request.post(endpoint).send({ url });
        expect(response.status).toBe(400);
      });

      it("Null url", async () => {
        const url = null;
        const response = await request.post(endpoint).send({ url });
        expect(response.status).toBe(400);
      });

      it("Undefined url", async () => {
        const url = undefined;
        const response = await request.post(endpoint).send({ url });
        expect(response.status).toBe(400);
      });

      it("Invalid url", async () => {
        const url = faker.lorem.sentence();
        const response = await request.post(endpoint).send({ url });
        expect(response.status).toBe(400);
      });

      it("Url already mapped", async () => {
        const url = faker.internet.url();
        const response = await request.post(endpoint).send({ url });
        const response2 = await request.post(endpoint).send({ url });
        expect(response2.status).toBe(400);
      });
    });
  });

  describe("GET request given ID", () => {
    it("Respond 200", async () => {
      const id = teenyUrls[0]._id.valueOf();
      const response = await request.get(`${endpoint}/${id}`);
      expect(response.status).toBe(200);
    });

    it("Respond 400", async () => {
      const response = await request.get(`${endpoint}/invalid`);
      expect(response.status).toBe(400);
    });

    it("Respond 404", async () => {
      const response = await request.get(`/invalid`);
      expect(response.status).toBe(404);
    });
  });

  describe("PUT request", () => {
    it("Respond 405", async () => {
      // // TODO Implement me
      // put without ID?????
      const response = await request.put(`${endpoint}/id`);
      expect(response.status).toBe(405);
    });
  });

  describe("DELETE request", () => {
    it("Respond 200", async () => {
      const id = teenyUrls[0]._id.valueOf();
      const response = await request.delete(`${endpoint}/${id}`);
      expect(response.status).toBe(200);
    });

    it("Respond 400", async () => {
      const id = teenyUrls[0]._id.valueOf();
      const response = await request.delete(`${endpoint}/invalid`);
      expect(response.status).toBe(400);
    });

    it("Respond 404", async () => {
      const response = await request.delete(`/invalid`);
      expect(response.status).toBe(404);
    });
  });

  describe("Redirect from short to long URL", () => {
    it("Respond 302", async () => {
      const example = teenyUrls[0];
      const key = example.key;
      const response = await request.get(`/${key}`);
      expect(response.status).toBe(302);
    });

    it("Respond 404", async () => {
      const response = await request.get(`/invalid`);
      expect(response.status).toBe(404);
    });
  });
});
