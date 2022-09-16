const express = require("express");
const AWS = require("aws-sdk");

exports.uploadToS3 = (data, filename) => {
  const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
  const IAM_USER_KEY = process.env.AWS_IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.AWS_IAM_USER_SECRET;

  let S3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    S3Bucket.upload(params, (err, response) => {
      if (err) {
        console.log("Something went wrong", err);
        reject(err);
      } else {
        resolve(response.Location); //return fileURL
      }
    });
  });
};
