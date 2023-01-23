const aws = require("aws-sdk");
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const dotnev = require("dotenv");
const { json } = require("body-parser");
const { v4: uuidv4 } = require("uuid");
dotnev.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  //   cors: [
  //     {
  //       allowedMethods: ["GET", "POST", "PUT"],
  //       allowedOrigins: ["*"],
  //       allowedHeaders: ["*"],
  //     },
  //   ],
});

// ("S3", s3)

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};

const getFileStream = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    }
    return s3.getObject(downloadParams).createReadStream();
}



module.exports = {  uploadFile, getFileStream };
