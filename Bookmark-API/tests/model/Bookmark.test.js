import { expect, describe, it, beforeAll, afterAll } from "vitest";
import Bookmark from "../../src/model/Bookmark.js";
import { faker } from "@faker-js/faker";
import * as db from "../../src/data/db.js";
import * as dotenv from "dotenv";

dotenv.config();

describe("Test Bookmark Schema & Model", () => {
  beforeAll(async () => {
    db.connect(process.env.DB_TEST_URI);
    await Bookmark.deleteMany({});
  })

  it("test create bookmark", async () => {
    const title = faker.lorem.sentence();
    const url = faker.internet.url();
    const bookmark = await Bookmark.create({ title, url });
    expect(bookmark.title).toBe(title);
    expect(bookmark.url).toBe(url);
    expect(bookmark.id).toBeDefined();
  });

  describe("test invalid title", () => {
    it("when title is null", async () => {
      try {
        const title = null;
        const url = faker.internet.url();
        await Bookmark.create({ title, url });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  })

  describe("test invalid url", () => {
    it("when url is not a url", async () => {
      try {
        const title = faker.lorem.sentence();
        const url = faker.lorem.sentence();
        await Bookmark.create({ title, url });
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  })



  afterAll(async () => {
    await Bookmark.deleteMany({});
  })
})



