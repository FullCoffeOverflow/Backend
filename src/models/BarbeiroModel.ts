import mongoose, { Schema, Document } from 'mongoose';

interface BarbeiroModel extends Document {
    authId: string;
    name: string;
    birthdate: Date;
    cep: string;
    number: string;
    phone: string;
    description: string;
}

const BarbeiroSchema = new Schema({
    authId: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: 'Enter an email.',
    },
    name: {
        type: String,
        required: 'Enter a name.',
    },
    birthdate: {
        type: Date,
        required: 'Enter a birthdate.',
    },
    cep: {
        type: String,
        required: 'Enter a CEP.',
    },
    number: {
        type: String,
        required: 'Enter a number of a place.',
    },
    phone: {
        type: String,
        required: 'Enter a phone number.',
    },
    description: {
        type: String,
        required: 'Enter a description.',
    },
});

const BarbeiroCollection = mongoose.model<BarbeiroModel>('Barbeiro', BarbeiroSchema);

const Barbeiro = {
    findAll: (): Promise<BarbeiroModel[]> => {
        return BarbeiroCollection.find().then();
    },
    findById: (id: string): Promise<BarbeiroModel> => {
        return BarbeiroCollection.findById(id).then();
    },
    findByAuthId: (authId: string): Promise<BarbeiroModel> => {
        return BarbeiroCollection.findOne({ authId }).then();
    },
    save: (barbeiro: BarbeiroModel): Promise<BarbeiroModel> => {
        return barbeiro.save().then();
    },
    delete: (id: string): Promise<void> => {
        return BarbeiroCollection.findByIdAndDelete(id).then();
    },
};

export { BarbeiroModel, BarbeiroCollection };

export default Barbeiro;
