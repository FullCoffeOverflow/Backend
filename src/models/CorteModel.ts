import mongoose, { Schema, Document } from 'mongoose';

import Auth from './AuthModel';
import Usuario from './UsuarioModel';

    enum CORTE_STATUS {
        AGUARDANDO = 'AGUARDANDO',
        FINALIZADO = 'FINALIZADO',
        USUARIO_FALTOU = 'USUARIO_FALTOU',
    }

interface CorteModel extends Document {
    barbeiroId: string;
    usuarioId: string;
    fotosId: [string];
    avalicao: number;
    status: CORTE_STATUS;
    horarioCorte: Date;
}

const CorteSchema = new Schema({
    barbeiroId: {
        type: Schema.Types.ObjectId,
        ref: 'Barbeiro',
        required: 'Enter a barbeiroId',
    },
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: 'Enter a usuarioId',
    },
    fotosId: {
        type: [String],
    },
    avalicao: {
        type: Number,
    },
    status: {
        type: CORTE_STATUS,
    },
    horarioCorte: {
        type: Date,
    }
});

const CorteCollection = mongoose.model<CorteModel>('Corte', CorteSchema);

const CorteActions = {
    findById: (id: string): Promise<CorteModel> => {
        return CorteCollection.findById(id).then();
    },
    findByUsuario: async (email: string): Promise<[CorteModel]> => {
        const auth = await Auth.findByEmail(email);

        console.log(auth);

        const usuario = await Usuario.findByAuthId(auth.id);

        console.log(usuario);

        return CorteCollection.find({ usuarioId: usuario.id }).then();
    },
    findByStatus:(status: string): Promise<CorteModel> => {
        return CorteCollection.find({ status: status }).then();
    },
    finfByBarbeiroEStatus:(status: string, barbeiroId: string): Promise<CorteModel> => {
        return CorteCollection.find({status: status}).find({barbeiroId: barbeiroId}).then()
    },
    finfByUsuarioEStatus:(status: string, usuarioId: string): Promise<CorteModel[]> => {
        return CorteCollection.find({status: status}).find({usuarioId: usuarioId}).then()
    },
    save: (corte: CorteModel): Promise<CorteModel> => {
        return corte.save().then();
    },
};

export { CORTE_STATUS, CorteModel, CorteCollection };

export default CorteActions;
