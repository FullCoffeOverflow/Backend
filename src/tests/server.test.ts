import req from 'supertest';

import { mongoDisconnector } from '../config/MongoConfig';

import server from './../server';

describe('Testing the server', () => {
    afterAll(async () => {
        await mongoDisconnector();
    });

    it('[GET] /', async done => {
        const res = await req(server).get('/');
        expect(res.text).toBe("Don't Panic! All right!");
        done();
    });
});
