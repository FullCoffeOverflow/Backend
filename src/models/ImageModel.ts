import mongoose, { Schema, Document } from 'mongoose';

import Corte from './CorteModel';

interface ImageModel extends Document {
    corteId: string;
    linkFoto: string;
}

const ImageSchema = new Schema({
    corteId: {
        type: Schema.Types.ObjectId,
        ref: 'Corte',
        required: 'Enter a corteId.',
    },
    linkFoto: {
        type: String,
        required: 'Enter a link.',
    },
});

const ImageCollection = mongoose.model<ImageModel>('Image', ImageSchema);

const ImageActions = {
    findAll: (): Promise<[ImageModel]> => {
        return ImageCollection.find().then();
    },
    findById: (id: string): Promise<ImageModel> => {
        return ImageCollection.findById(id).then();
    },
    findByUsuario: async (email: string): Promise<ImageModel[][]> => {
        const cortes = await Corte.findByUsuario(email);

        console.log(cortes);

        const imgsPromises = cortes.map(corte => ImageCollection.find({ corteId: corte.id }).then());

        console.log(imgsPromises);

        return Promise.all(imgsPromises).then();
    },
    save: (image: ImageModel): Promise<ImageModel> => {
        return image.save().then();
    },
};

export { ImageModel, ImageCollection };

export default ImageActions;
