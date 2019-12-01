import { mongoConnector, mongoDisconnector } from '../config/MongoConfig';

describe('MongoDB Configurations', () => {
    afterAll(async () => {
        await mongoDisconnector();
    });

    it('Testing connection and disconnection', async () => {
        await mongoConnector();
        await mongoDisconnector();
    });
});
