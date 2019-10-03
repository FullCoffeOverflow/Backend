import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../../.env") });

import { mongoConnector, mongoDisconnector } from '../config/mongoConfig'

describe('MongoDB Configurations', () => {
  it('Testing connection and disconnection', () => {
    mongoConnector();
    mongoDisconnector();
  });
});