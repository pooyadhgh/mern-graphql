const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./schema');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, () =>
  console.log(`⚡️ Server is running on port: ${port}`.cyan.underline.bold)
);
