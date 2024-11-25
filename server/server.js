require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mainRouter = require("./mainRouter");

const port = process.env.PORT;
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

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
