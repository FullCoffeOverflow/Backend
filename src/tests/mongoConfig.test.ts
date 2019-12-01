import { mongoConnector, mongoDisconnector } from '../config/MongoConfig';

describe('MongoDB Configurations', () => {
    it('Testing connection and disconnection', async () => {
        await mongoConnector();
        await mongoDisconnector();
    });
});
