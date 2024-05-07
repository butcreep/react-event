const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.use(cors());

app.post("/mails", upload.single("file"), async (req, res) => {
  const file = req.file;
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file.originalname,
    Body: fileStream,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const result = await s3Client.send(command);
    res.send({
      message: "File uploaded successfully",
      url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file.");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
