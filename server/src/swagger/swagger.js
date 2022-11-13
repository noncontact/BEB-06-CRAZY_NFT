const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CodeStates_Project <Crazy_NFT>",
      version: "1.0.0",
      description: "Crazy_NFT팀의 RestFul API 문서 UI",
    },
    basePath: "/",
    servers: [
      {
        url: "http://localhost:3005",
      },
    ],
  },
  apis: ["@src/routes/*.js", "@src/models/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs }
