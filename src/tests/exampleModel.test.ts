//import { mongoConnector, mongoDisconnector } from '../config/MongoConfig';
import Example, { ExampleModel } from '../models/ExampleModel';

import mongoose from 'mongoose';

describe('User model', () => {
    /*beforeAll(async () => {
        await mongoConnector();
    });

    afterAll(async () => {
        await mongoDisconnector();

        await Example.deleteMany({ email: 'test@example.com' });
    });*/

    beforeAll(async () => {
        const mongoUrl = process.env.MONGO_URL;
        if (mongoUrl == undefined) {
            console.error('process.env.MONGO_URL is undefined');
            process.exit(1);
        } else {
            await mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true }, err => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
        }
    });

    afterAll(async () => {
        await Example.deleteMany({ email: 'test@example.com' });
        await mongoose.disconnect();
    });

    it('Should save a user', async () => {
        expect.assertions(3);

        const newExample: ExampleModel = new Example({
            firstName: 'Adrisson',
            lastName: 'Samersla',
            email: 'test@example.com',
            company: 'FULL COFFE OVERFLOW',
            phone: 85996830178,
            createdDate: new Date(),
        });

        const spy = jest.spyOn(newExample, 'save');
        const savedExample = await newExample.save();

        expect(spy).toHaveBeenCalled();

        expect(savedExample).toMatchObject({
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
            company: expect.any(String),
            phone: expect.any(Number),
            createdDate: expect.any(Date),
        });

        expect(savedExample.email).toBe('test@example.com');
    });
});
