import mongoose from 'mongoose';

import configs from './Config';

let urlConn: string;
if (process.env.MONGO_URL == undefined) {
    urlConn = configs.MONGO_URI;
} else {
    urlConn = process.env.MONGO_URL;
}

const mongoConnector = async (): Promise<void> => {
    console.log(`Trying to connect to MongoDB server: ${urlConn}`);
    await mongoose.connect(urlConn, { useNewUrlParser: true });
};

const mongoDisconnector = async (): Promise<void> => {
    console.log(`Trying to disconnect from MongoDB server: ${urlConn}`);
    await mongoose.disconnect();
};

export { mongoConnector, mongoDisconnector };
