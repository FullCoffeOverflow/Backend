import bcryptjs from 'bcryptjs';

const hashing = (word: string): Promise<string> => {
    return bcryptjs.hash(word, 10);
};

const comparing = (word: string, hash: string): Promise<boolean> => {
    return bcryptjs.compare(word, hash);
};

const crypto = {
    hashing,
    comparing,
};

export default crypto;
