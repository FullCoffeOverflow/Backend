import mongoose, { Schema, Document } from 'mongoose';

interface IUsuario extends Document {
  authId: any;
  name: string,
  birthdate: Date,
  cep: string,
  phone: string,
}

const UsuarioSchema = new Schema({
  authId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth'
  },
  name: {
    type: String,
    required: 'Enter a name.'
  },
  birthdate: {
    type: Date,
    required: 'Enter a birthdate.'
  },
  cep: {
    type: String,
    required: 'Enter a CEP.'
  },
  phone: {
    type: String,
    required: 'Enter a phone number.'
  }
});

const UsuarioModel = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

const Usuario = {
  findAll: (): Promise<IUsuario[]> => {
    return UsuarioModel.find().then();
  },
  findById: (id: any): Promise<IUsuario> => {
    return UsuarioModel.findById(id).then();
  },
  save: (usuario: IUsuario): Promise<IUsuario> => {
    return usuario.save().then()
  }
}

export {
  IUsuario,
  UsuarioModel
};

export default Usuario;
