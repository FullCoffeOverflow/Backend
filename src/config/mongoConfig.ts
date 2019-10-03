import mongoose from "mongoose";

let mongoUri: string;
if (process.env.MONGO_URI === undefined)
    throw new Error("MONGO_URI is required in process.env variables. Check the .env file needed.");
mongoUri = process.env.MONGO_URI;

const mongoConnector = async () => {
    console.log(`Trying to connect to MongoDB server: ${mongoUri}`)
    await mongoose.connect(mongoUri, {useNewUrlParser: true})
};

const mongoDisconnector = async () => {
    console.log(`Trying to disconnect from MongoDB server: ${mongoUri}`)
    await mongoose.disconnect();
}

export {
    mongoConnector,
    mongoDisconnector
};
