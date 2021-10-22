const express = require("express");
const Router = require("./routes");
const jwt = require("jsonwebtoken");
const api = express();
const Sequelize = require("sequelize");
const http = require("http");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const { sgMail } = require("@sendgrid/mail");
const app = express();
const { sendEmail } = require("./utils/email");
require("dotenv").config();

const swaggerAPIPath = "/api";
//
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Activity feed Swagger",
      description: "API Documentation for Activity feed",
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: ["http://localhost:3000"],
    basePath: swaggerAPIPath,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["routes/*.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(Router);

app.listen(3000, () => {
  console.log(`server running at port:3000`);
});
