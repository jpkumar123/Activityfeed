const Router = require("express").Router();

const userRouter = require("./UsersRouter");
const postRouter = require("./PostRouter");
const { isAuthorized, isAdmin } = require("../middlewares");
const { Post } = require("../models/index");
const { User } = require("../models/index");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Activity feed API List',
        version: '1.0.0',
      },
    },
    // Path to the API docs
    apis: [ 'routes/*.js'],
  };
  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options);
  Router.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });


Router.use("/", userRouter);
Router.use("/", isAuthorized, postRouter);

module.exports = Router;
