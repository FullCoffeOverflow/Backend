import { Request, Response } from 'express';

import crypto from '../utils/Crypto';
import { enviaEmail, Email } from '../utils/Emailer';

import Auth, { AUTH_ROLES, AuthModel, AuthCollection } from '../models/AuthModel';
import Usuario, { UsuarioModel, UsuarioCollection } from '../models/UsuarioModel';

const UsuarioController = {
    cadastrar: async (req: Request, res: Response): Promise<void> => {
        const { email, password, name, birthdate, cep, phone } = req.body;

        let hashedPassword: string;
        try {
            hashedPassword = await crypto.hashing(password);
        } catch (err) {
            console.log('Error while hashing the password.');
            console.log(err.msg);
            res.status(500).json("Error error error");
            return;
        }

        const newAuth: AuthModel = new AuthCollection({
            email,
            password: hashedPassword,
            role: AUTH_ROLES.USUARIO,
        });

        const savedAuth = await Auth.save(newAuth);

        const newUsuario: UsuarioModel = new UsuarioCollection({
            authId: savedAuth.id,
            name,
            birthdate,
            cep,
            phone,
        });

        const savedUsuario = await Usuario.save(newUsuario);

        console.log(savedUsuario.toJSON);

        res.status(200).json(savedUsuario);

        const feedbackEmail: Email = {
            to: savedAuth.email,
            from: 'no-reply-fco@fco.com.br',
            subject: 'Novo Cadastro',
            content: `
                Obrigado, ${savedUsuario.name}, pelo cadastro em nosso apliativo.<br>
                Respeitosamente,<br>
                Equipe do Full Coffee Overflow
            `,
        };
        await enviaEmail(feedbackEmail);
    },
    retornarPorId: async (req: Request, res: Response): Promise<void> => {
        const { usuarioId } = req.params;

        const usuario = await Usuario.findById(usuarioId);

        res.status(200).json(usuario);
    },
    atualizarPorId: async (req: Request, res: Response): Promise<void> => {
        const { password, name, birthdate, cep, phone } = req.body;
        const { usuarioId } = req.params;

        console.log(req.body.birthdate);

        const usuario = await Usuario.findById(usuarioId);
        if (usuario == null) {
            console.log('usuario is undefined! Bad usuarioID!');
            res.status(400).json("usuario is undefined! Bad usuarioID");
            return;
        }

        console.log(req.body.password);

        const auth = await Auth.findById(usuario.authId);
        if (password !== undefined) {
            let hashedPassword: string;
            try {
                hashedPassword = await crypto.hashing(password);
            } catch (err) {
                console.log('Error while hashing the password.');
                console.log(err.message);
                res.status(500).json("Error");
                return;
            }

            auth.password = hashedPassword;
            await Auth.save(auth);
        }

        usuario.name = name || usuario.name;
        usuario.birthdate = birthdate || usuario.birthdate;
        usuario.cep = cep || usuario.cep;
        usuario.phone = phone || usuario.phone;
        const savedUsuario = await Usuario.save(usuario);

        res.status(200).json(savedUsuario);

        const feedbackEmail: Email = {
            to: auth.email,
            from: 'no-reply-fco@fco.com.br',
            subject: 'Alteração do Cadastro',
            content: `
                Olá, ${savedUsuario.name}.<br>
                Seu cadastro foi alterado com sucesso. Veja seus novos dados:<br>
                Data de Aniversário: ${usuario.birthdate.toLocaleDateString}<br>
                CEP: ${usuario.cep}<br>
                Telefone: ${usuario.phone}<br>
                Respeitosamente,<br>
                Equipe do Full Coffee Overflow
            `,
        };
        await enviaEmail(feedbackEmail);
    },
};

export default UsuarioController;
