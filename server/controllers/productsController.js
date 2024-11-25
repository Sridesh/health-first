const multer = require("multer");
const crypto = require("crypto");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { getAllProducts } = require("../models/productModel");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const dotenv = require("dotenv");

dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

//S3 Configuration
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

//----------Controllers
const getProductsList = async (req, res) => {
  try {
    const productList = await getAllProducts();

    for (const product of productList) {
      const getObjectParams = {
        Bucket: BUCKET_NAME,
        Key: product.image,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

      product.imageUrl = url;
    }

    res.status(200).json(productList);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Could not fetch products" });
  }
};

module.exports = { getProductsList };
