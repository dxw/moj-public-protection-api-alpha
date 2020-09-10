const { app } = require("./app");
const request = require("supertest");

test("hello!", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toEqual("Hello dxw!");
});
