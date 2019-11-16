import fs from 'fs';

import { Request, Response } from 'express';

import S3 from '../config/AwsConfig';

import Image, { ImageCollection, ImageModel } from '../models/ImageModel';

const ImageController = {
    saveImage: async (req: Request, res: Response): Promise<void> => {
        const corteId = req.params.corteId;

        const key = `userImages/${req.file.originalname}`;
        const payload = fs.createReadStream(req.file.path);

        try {
            const response = await S3.upload(key, payload);
            console.log(`
              Image ${response.Key} was successfully uploaded 
              to ${response.Bucket} at ${response.Location}
            `);

            const img: ImageModel = new ImageCollection({
                corteId,
                linkFoto: response.Location,
            });

            await Image.save(img);

            res.sendStatus(200);
        } catch (err) {
            console.log('Error occured while saving in S3 or while saving in MongoDB', err);
            res.sendStatus(500);
        }
    },
    getByUsuario: async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;

        console.log('email: ' + email);

        const imgs = await Image.findByUsuario(email);
        const imgsProcessed = imgs.reduce((acc, cur) => acc.concat(cur));

        res.json(imgsProcessed);
    },
};

export default ImageController;
