const { app } = require("./app");
const request = require("supertest");
const Sinon = require("sinon");
const Review = require("./models/Review");

test("GET /reviews", async () => {
  Sinon.stub(Review, "query").returns({
    withGraphJoined: Sinon.stub().returns(Promise.resolve([{ id: 1 }])),
  });
  const response = await request(app).get("/reviews");
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("reviews");
});
