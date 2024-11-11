require("dotenv").config();
const express = require("express");
const mainRouter = require("./mainRouter");

const port = process.env.PORT;
const app = express();

//middleware
app.use(express.json());

//routes
// app.use(routes);

//newRoutes
app.use("/", mainRouter);

// next middle wear - error handling
app.use(function (err, req, res, next) {
  res.send({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, function () {
  console.log(`Server up and running on port ${port}`);
});
