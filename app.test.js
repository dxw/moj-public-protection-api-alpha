const { app } = require("./app");
const request = require("supertest");
const sinon = require("sinon");
const Review = require("./models/Review");
const Offender = require("./models/Offender");

test("GET /reviews", async () => {
  const mockReview = { id: 1 };
  sinon.stub(Review, "query").callsFake(() => {
    return {
      withGraphJoined() {
        return Promise.resolve([mockReview]);
      },
    };
  });
  const response = await request(app).get("/reviews");
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ reviews: [mockReview] });
});

describe("GET /offenders/:identifier/:value", () => {
  describe("given a valid offender identifier", () => {
    test("returns the reviews for that offender", async () => {
      const mockReview = { id: 1 };
      const subQueryMock = jest.fn();
      sinon
        .stub(Offender, "propertyNameToColumnName")
        .returns("mappedColumnName");
      sinon.stub(Offender, "query").callsFake(() => {
        return {
          where() {
            return Promise.resolve(subQueryMock);
          },
        };
      });
      sinon.stub(Offender, "relatedQuery").callsFake(() => {
        return {
          for() {
            return {
              withGraphJoined() {
                return Promise.resolve([mockReview]);
              },
            };
          },
        };
      });
      const response = await request(app).get(
        "/offender/prisonNumber/A123456C/reviews"
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        reviews: [mockReview],
      });
    });
  });

  describe("given an invalid offender identifier", () => {
    test("returns an error response", async () => {
      const response = await request(app).get(
        "/offender/notAnIdentifier/A123456C/reviews"
      );
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Offender identifier must be croNumber,prisonNumber",
      });
    });
  });
});
