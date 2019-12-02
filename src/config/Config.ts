import { resolve } from 'path';

import { config } from 'dotenv';
config({ path: resolve(__dirname, './../../.env') });

const PORT = process.env.PORT || 3000;

if (process.env.MONGO_URI === undefined)
    throw new Error('MONGO_URI is required in process.env variables. Check the .env file needed.');
const MONGO_URI = process.env.MONGO_URI;

if (process.env.JWT_SECRET === undefined)
    throw new Error('JWT_SECRET is required in process.env variables. Check the .env file needed.');
const JWT_SECRET = process.env.JWT_SECRET;

if (process.env.SENDGRID_KEY === undefined)
    throw new Error('SENDGRID_KEY is required in process.env variables. Check the .env file needed.');
const SENDGRID_KEY = process.env.SENDGRID_KEY;

if (process.env.AWS_ACCESSKEYID === undefined)
    throw new Error('AWS_ACCESSKEYID is required in process.env variables. Check the .env file needed.');
const AWS_ACCESSKEYID = process.env.AWS_ACCESSKEYID;

if (process.env.AWS_SECRETACCESSKEY === undefined)
    throw new Error('AWS_SECRETACCESSKEY is required in process.env variables. Check the .env file needed.');
const AWS_SECRETACCESSKEY = process.env.AWS_SECRETACCESSKEY;

if (process.env.AWS_REGION === undefined)
    throw new Error('AWS_REGION is required in process.env variables. Check the .env file needed.');
const AWS_REGION = process.env.AWS_REGION;

if (process.env.BUCKET_NAME === undefined)
    throw new Error('BUCKET_NAME is required in process.env variables. Check the .env file needed.');
const BUCKET_NAME = process.env.BUCKET_NAME;

if (process.env.MAPS_API_KEY === undefined)
    throw new Error('MAPS_API_KEY is required in process.env variables. Check the .env file needed.');
const MAPS_API_KEY = process.env.MAPS_API_KEY;

const configs = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    SENDGRID_KEY,
    AWS_ACCESSKEYID,
    AWS_SECRETACCESSKEY,
    AWS_REGION,
    BUCKET_NAME,
    MAPS_API_KEY,
};

export default configs;
