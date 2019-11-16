import fs from 'fs';

import aws from 'aws-sdk';

import configs from './Config';

aws.config.update({
    accessKeyId: configs.AWS_ACCESSKEYID,
    secretAccessKey: configs.AWS_SECRETACCESSKEY,
    region: configs.AWS_REGION,
});

const S3 = {
    upload: (key: string, payload: fs.ReadStream): Promise<aws.S3.ManagedUpload.SendData> => {
        const s3 = new aws.S3();

        const params: aws.S3.PutObjectRequest = {
            ACL: 'public-read',
            Bucket: configs.BUCKET_NAME,
            Body: payload,
            Key: key,
        };

        return s3.upload(params).promise();
    },
};

export default S3;
