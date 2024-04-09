import AWS from "aws-sdk";

const credentials = {
  accessKeyId: "na",
  secretAccessKey: "na",
};

const bucketName = "post-images";

const s3client = new AWS.S3({
  credentials,
  endpoint: "http://localhost:4566",
});

const uploadFile = async (data, name) =>
  new Promise((resolve) => {
    s3client.upload(
      {
        Bucket: bucketName,
        Key: `${bucketName}/${name}`,
        Body: data,
      },
      (err, response) => {
        if (err) throw err;
        resolve(response);
      }
    );
  });

export default uploadFile;
