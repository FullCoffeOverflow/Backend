import { mongoConnector, mongoDisconnector } from '../config/MongoConfig'

describe('MongoDB Configurations', () => {
  it('Testing connection and disconnection', () => {
    mongoConnector();
    mongoDisconnector();
  });
});