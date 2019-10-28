import { resolve } from "path"

// Configuring environmental variables 
import { config } from "dotenv"
config({ path: resolve(__dirname, "./../../.env") })

const PORT = process.env.PORT || 3000;

let MONGO_URI: string;
if (process.env.MONGO_URI === undefined)
  throw new Error("MONGO_URI is required in process.env variables. Check the .env file needed.");
MONGO_URI = process.env.MONGO_URI;

let JWT_SECRET: string;
if (process.env.JWT_SECRET === undefined)
  throw new Error("JWT_SECRET is required in process.env variables. Check the .env file needed.");
JWT_SECRET = process.env.JWT_SECRET;

let SENDGRID_KEY: string;
if (process.env.SENDGRID_KEY === undefined)
  throw new Error("SENDGRID_KEY is required in process.env variables. Check the .env file needed.");
SENDGRID_KEY = process.env.SENDGRID_KEY;

const configs = {
  MONGO_URI,
  PORT,
  JWT_SECRET,
  SENDGRID_KEY
}

export default configs;
