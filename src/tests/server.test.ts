import req from 'supertest';
import server from './../server';

import { mongoDisconnector } from './../config/MongoConfig';

test('[GET] /', async () => {
    const res = await req(server).get('/');
    expect(res.text).toBe("Don't Panic! All right!");

    await mongoDisconnector();
});

describe('Server Integration', () => {
    afterAll(async () => {
        await mongoDisconnector();
    });

    it('[GET] /', async () => {
        const res = await req(server).get('/');
        expect(res.text).toBe("Don't Panic! All right!");
    });
});
