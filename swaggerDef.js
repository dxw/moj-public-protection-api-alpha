const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    swagger: "2.0.0",
    info: {
      title: "PPUD Legacy API alpha (protoype)",
      version: "1.0.0",
    },
  },
  // Path to the API docs
  apis: ["./app.js"],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerDef = swaggerJSDoc(options);

module.exports = swaggerDef;
