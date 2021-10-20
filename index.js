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

// api.post('/secure', function(req, res) {
//   const token = jwt.sign({ user: { id: 1, name: 'ME!', role: 'average' } }, 'dsfklgj');
//   console.log(token);
//   res.json({ jwt: token });
// ;

// api.post('/check/post', function(req, res) {
//   const token = req.body.jwt;
//   console.log('token: ' + token);
//   const x = jwt.verify(token, 'dsfklgj', function(err, decoded) {
//       if (err) throw err;
//       console.log(decoded);
//   });
//   console.log(x);
//   if (x != true) {
//       res.json({ auth: false });
//   } else {
//       res.json({ auth: true });
//   }
// });
// swaggerDocument = require('./swagger.json');
// const swaggerUi = require('swagger-ui-express');
// const swaggerAPIPath = process.env.SWAGGER_APIPATH || '/';
// app.get(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument)
// );
// api.set('port',8000);
// var server = http.createServer(api);
// server.listen(api.get('port'), function() {
//     console.log("Express server listening on port " + api.get('port'));
// });

app.listen(3000, () => {
  console.log(`server running at port:3000`);
});
