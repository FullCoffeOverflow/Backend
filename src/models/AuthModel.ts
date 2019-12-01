import mongoose, { Schema, Document } from 'mongoose';

enum AUTH_ROLES {
    USUARIO = 'USUARIO',
    BARBEIRO = 'BARBEIRO',
    ADMIN = 'ADMIN',
}

interface AuthModel extends Document {
    email: string;
    password: string;
    createdDate: Date;
    role: AUTH_ROLES;
}

const AuthSchema = new Schema({
    email: {
        type: String,
        required: 'Enter a email.',
        unique: true,
    },
    password: {
        type: String,
        required: 'Enter a password.',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: AUTH_ROLES,
        required: 'Enter a proper role.',
    },
});

const AuthCollection = mongoose.model<AuthModel>('Auth', AuthSchema);

const AuthActions = {
    findByEmail: (email: string): Promise<AuthModel> => {
        return AuthCollection.findOne({ email }).then();
    },
    findById: (id: string): Promise<AuthModel> => {
        return AuthCollection.findById(id).then();
    },
    save: (auth: AuthModel): Promise<AuthModel> => {
        return auth.save().then();
    },
    delete: (id: string): Promise<void> => {
        return AuthCollection.findByIdAndDelete(id).then();
    }
};

export { AUTH_ROLES, AuthModel, AuthCollection };

export default AuthActions;
