import Crypto from '../utils/Crypto';

describe('Crypto Configurations', () => {
    it('Valid Password', async () => {
        const password = 'PASSWORD_TEST';
        const hashed = await Crypto.hashing(password);

        const validation = await Crypto.comparing(password, hashed);

        console.log(`
            password: ${password}
            hashed password: ${hashed}

            input password: ${password} compared to ${password}
            response: ${validation}
            expected: ${true}
        `);

        expect(validation).toBe(true);
    });

    it('Invalid Password', async () => {
        const password = 'PASSWORD_TEST';
        const hashed = await Crypto.hashing(password);

        const wrongPassword = 'PASSWORD_TEST_INVALID';

        const validation = await Crypto.comparing(wrongPassword, hashed);

        console.log(`
            password: ${password}
            hashed password: ${hashed}

            input password: ${wrongPassword} compared to ${password}
            response: ${validation}
            expected: ${false}
        `);

        expect(validation).toBe(false);
    });
});
