const router = require("express").Router();
const multer = require("multer");
const crypto = require("crypto");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const dotenv = require("dotenv");

dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
  region: BUCKET_REGION,
});

router.post("/", upload.single("file"), async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);

  req.file.buffer;

  const params = {
    Bucket: BUCKET_NAME,
    Key: randomImageName(),
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  res.json({ message: "hi" });
});

module.exports = router;
