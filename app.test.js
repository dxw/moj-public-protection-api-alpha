const { app } = require("./app");
const request = require("supertest");

test("GET /reviews", async () => {
  const response = await request(app).get("/reviews");
  expect(response.status).toBe(200);
  expect(response.text).toEqual("Hello dxw!");
});
