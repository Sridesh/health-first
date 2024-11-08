const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/api");

const app = express();

app.use(bodyParser.json());

app.use(routes);

app.use(function (err, req, res, next) {
  res.send({
    error: {
      message: err.message,
    },
  });
});

app.listen(3000, function () {
  console.log("Server up and running on port 3000");
});
