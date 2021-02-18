const mongoose = require("mongoose");

const InitiateMongoServer = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("‘MongoDB Connected…’");
    })
    .catch((err) => console.log(err));
  mongoose.connection.on("error", function (e) {
    console.error(e);
  });
};
module.exports = InitiateMongoServer;
