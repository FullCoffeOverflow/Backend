import mongoose, { Schema, Document } from 'mongoose';

interface UsuarioModel extends Document {
    authId: string;
    name: string;
    birthdate: Date;
    cep: string;
    phone: string;
}

const UsuarioSchema = new Schema({
    authId: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: 'Enter an authId.',
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
    phone: {
        type: String,
        required: 'Enter a phone number.',
    },
});

const UsuarioCollection = mongoose.model<UsuarioModel>('Usuario', UsuarioSchema);

const Usuario = {
    findAll: (): Promise<UsuarioModel[]> => {
        return UsuarioCollection.find().then();
    },
    findById: (id: string): Promise<UsuarioModel> => {
        return UsuarioCollection.findById(id).then();
    },
    findByAuthId: (authId: string): Promise<UsuarioModel> => {
        return UsuarioCollection.findOne({ authId }).then();
    },
    save: (usuario: UsuarioModel): Promise<UsuarioModel> => {
        return usuario.save().then();
    },
};

export { UsuarioModel, UsuarioCollection };

export default Usuario;
