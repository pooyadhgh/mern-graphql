const mongoose = require('mongoose');

const connetcDB = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI);
  console.log(
    `⚡️ Mongo DB connected: ${connection.connection.host}`.cyan.underline.bold
  );
};

module.exports = connetcDB;
