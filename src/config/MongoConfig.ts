import mongoose from "mongoose";

import configs from "./Config";

const mongoConnector = async () => {
    console.log(`Trying to connect to MongoDB server: ${configs.MONGO_URI}`)
    await mongoose.connect(configs.MONGO_URI, {useNewUrlParser: true})
};

const mongoDisconnector = async () => {
    console.log(`Trying to disconnect from MongoDB server: ${configs.MONGO_URI}`)
    await mongoose.disconnect();
}

export {
    mongoConnector,
    mongoDisconnector
};
