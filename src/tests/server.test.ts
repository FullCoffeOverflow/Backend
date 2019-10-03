import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env") });

import req from "supertest";
import server from "./../server";

test("[GET] /", async () => {
  const res = await req(server).get("/");
  expect(res.text).toBe("Don't Panic! All right!");
});