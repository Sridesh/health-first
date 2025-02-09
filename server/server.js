require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const https = require("https");
const fs = require("fs");
const path = require("path");
const { doubleCsrf } = require("csrf-csrf");
// const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const mainRouter = require("./routes");
const pool = require("./config/db");

const port = process.env.PORT;
const app = express();

//csrf
const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  cookieName: "x-csrf-token", // Changed to match header name convention
  cookieOptions: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
  size: 64, // Token length
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
});

app.use(cookieParser());

//middleware
app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow common methods
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-TOKEN"], // Allow necessary headers
  })
);
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-site" },
    dnsPrefetchControl: true,
    frameguard: { action: "deny" },
    hsts: { maxAge: 31536000, preload: true },
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

//session configuration
app.use(
  session({
    store: new pgSession({
      pool,
      tableName: process.env.SESSION_TABLE_NAME,
      createTableIfMissing: true,
      rolling: true, // Refresh session with each request
      unset: "destroy",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    },
    name: "sessionId",
  })
);

app.use(doubleCsrfProtection);

// CSRF token endpoint
app.get("/csrf-token", (req, res) => {
  try {
    const token = generateToken(req, res);
    res.json({ token });
  } catch (error) {
    console.error("CSRF Token Generation Error:", error);
    res.status(500).json({ error: "Failed to generate CSRF token" });
  }
});

// Routes
app.use("/", mainRouter);

// next middle wear - error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    },
  });
});

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, "../certs/localhost-key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "../certs/localhost.pem")),
};

// app.listen(port, function () {
//   console.log(`Server up and running on port ${port}`);
// });

https.createServer(httpsOptions, app).listen(port, function () {
  console.log(`Server up and running on port ${port}`);
});
