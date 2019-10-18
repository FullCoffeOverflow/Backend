import mongoose, { Schema, Document } from 'mongoose';

enum AUTH_ROLES {
  USUARIO = "USUARIO",
  BARBEIRO = "BARBEIRO",
  ADMIN = "ADMIN"
}

interface IAuth extends Document {
  email: string,
  password: string,
  created_date: Date,
  role: AUTH_ROLES
}

const AuthSchema = new Schema({
  email: {
    type: String,
    required: 'Enter a email.',
    unique: true
  },
  password: {
    type: String,
    required: 'Enter a password.'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: AUTH_ROLES,
    required: 'Enter a proper role.'
  }
});

const AuthModel = mongoose.model<IAuth>('Auth', AuthSchema);

const Auth = {
  findByEmail: (email: string): Promise<IAuth> => {
    return AuthModel.findOne({ email }).then()
  },
  findById: (id: any): Promise<IAuth> => {
    return AuthModel.findById(id).then();
  },
  save: (auth: IAuth): Promise<IAuth> => {
    return auth.save().then()
  }
}

export {
  AUTH_ROLES,
  IAuth,
  AuthModel
};

export default Auth;
