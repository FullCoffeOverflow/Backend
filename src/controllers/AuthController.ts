import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import configs from '../config/Config';
import crypto from '../utils/Crypto';

import Auth, { AuthModel } from '../models/AuthModel';
import Barbeiro, { BarbeiroModel } from '../models/BarbeiroModel';
import Usuario, { UsuarioModel } from '../models/UsuarioModel';
import { awaitExpression } from '@babel/types';

const AuthController = {
    login: async (req: Request, res: Response): Promise<void> => {
        //Check if username and password are set
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json("Wrong email or password");
        }

        //Get user from database
        let auth: AuthModel;
        try {
            auth = await Auth.findByEmail(email);
            if(auth == undefined){
                throw new Error('User not registered');
            }
        } catch (error) {
            console.log(error.message);
            res.status(401).json("User not registered");
            return;
        }

        const hasSamePassword = await crypto.comparing(password, auth.password);
        if (!hasSamePassword) {
            res.status(401).json("Wrong password");
            return;
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            {
                authId: auth.id,
                email: auth.email,
                role: auth.role,
            },  
            configs.JWT_SECRET,
            { expiresIn: '1h' },
        );

        let barbeiro: BarbeiroModel;
        let usuario: UsuarioModel;

        try {
            barbeiro = await Barbeiro.findByAuthId(auth.id);
            res.status(200).json({ token, barbeiroId: barbeiro.id });
        } catch (err) {
            usuario = await Usuario.findByAuthId(auth.id);
            res.status(200).json({ token, usuarioId: usuario.id });
        }

    },

    changePassword: async (req: Request, res: Response): Promise<void> => {
        //Get ID from JWT
        const id = res.locals.jwtPayload.authId;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).json("Please enter new and old psswords");
        }

        //Get user from the database
        let auth: AuthModel;
        try {
            auth = await Auth.findById(id);
        } catch (id) {
            res.status(401).json("User not in database");
            return;
        }

        //Check if old password matchs
        const hasSamePassword = await crypto.comparing(oldPassword, auth.password);
        if (!hasSamePassword) {
            res.status(401).json("Password does not match");
            return;
        }

        //Validate de model (password lenght)
        auth.password = await crypto.hashing(newPassword);
        const savedAuth = await Auth.save(auth);
        console.log(`Saved new password for ${savedAuth.email}`);

        res.status(204).json("Done!");
    },
};

export default AuthController;
