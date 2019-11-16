import { mongoConnector, mongoDisconnector } from '../config/MongoConfig';
import Example, { ExampleModel } from '../models/ExampleModel';

describe('User model', () => {
    beforeAll(async () => {
        await mongoConnector();
    });

    afterAll(async () => {
        await mongoDisconnector();

        await Example.deleteMany({ email: 'test@example.com' });
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
