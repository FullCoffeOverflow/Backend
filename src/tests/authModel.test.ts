import mongoose from 'mongoose';

import { AUTH_ROLES, AuthModel, AuthCollection } from '../models/AuthModel';

describe('User model', () => {
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
