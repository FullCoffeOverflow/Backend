import { mongoConnector, mongoDisconnector } from '../config/MongoConfig';
import { AUTH_ROLES, AuthModel, AuthCollection } from '../models/AuthModel';

describe('User model', () => {
    beforeAll(async () => {
        await mongoConnector();
    });

    afterAll(async () => {
        await mongoDisconnector();
    });

    it('Should save a user', async () => {
        expect.assertions(5);

        await AuthCollection.remove({ email: 'test@fco.com.br' });

        const newAuth: AuthModel = new AuthCollection({
            email: 'test@fco.com.br',
            password: 'admin',
            role: AUTH_ROLES.ADMIN,
        });

        const spyNewAuth = jest.spyOn(newAuth, 'save');
        const savedAuth = await newAuth.save();
        expect(spyNewAuth).toHaveBeenCalled();

        expect(savedAuth).toMatchObject({
            email: expect.any(String),
            password: expect.any(String),
            createdDate: expect.any(Date),
        });

        expect(savedAuth.email).toBe('test@fco.com.br');
        expect(savedAuth.password).toBe('admin');

        const spySavedAuth = jest.spyOn(savedAuth, 'remove');
        await savedAuth.remove();
        expect(spySavedAuth).toHaveBeenCalled();
    });
});
