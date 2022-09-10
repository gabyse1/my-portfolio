import aws from 'aws-sdk';

const region = 'us-west-1';
const bucketName = 'my-portfolio-gaby';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

const generateUploadURL = async (fname) => {
  const params = ({
    Bucket: bucketName,
    Key: fname,
    Expires: 300,
  });

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
  return uploadUrl;
};

export default generateUploadURL;
