import multer from 'multer';

export const imageParser = multer({ dest: 'temp/' }).single('image');
