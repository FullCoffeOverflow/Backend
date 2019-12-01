import { Request, Response } from 'express';

import crypto from '../utils/Crypto';
import { enviaEmail, Email } from '../utils/Emailer';

import Auth, { AUTH_ROLES, AuthModel, AuthCollection } from '../models/AuthModel';
import Barbeiro, { BarbeiroModel, BarbeiroCollection } from '../models/BarbeiroModel';

const BarbeiroController = {
    cadastrar: async (req: Request, res: Response): Promise<void> => {
        const { email, password, name, birthdate, cep, phone, number, description } = req.body;
      
        let hashedPassword: string;
        try {
            hashedPassword = await crypto.hashing(password);
        } catch (err) {
            console.log('Error while hashing the password.');
            console.log(err.msg);
            res.sendStatus(500);
            return;
        }

        const newAuth: AuthModel = new AuthCollection({
            email,
            password: hashedPassword,
            role: AUTH_ROLES.USUARIO,
        }); 

        let newBarbeiro: BarbeiroModel = new BarbeiroCollection({
            authId: '',
            name,
            birthdate,
            cep,
            phone,
            number,
            description,
        });

        const savedAuth = await Auth.save(newAuth);

        let savedBarbeiro: BarbeiroModel;

        try {
            newBarbeiro.authId = savedAuth.id;
            savedBarbeiro = await Barbeiro.save(newBarbeiro);
        } catch (err) {
            console.log('Error while validating fields.');
            console.log(err.message);
            await Auth.delete(savedAuth.id);
            res.sendStatus(400);
            return;
        }

        console.log(savedBarbeiro.toJSON);

        res.sendStatus(200);

        const feedbackEmail: Email = {
            to: savedAuth.email,
            from: 'no-reply-fco@fco.com.br',
            subject: 'Novo Cadastro',
            content: `
                Obrigado, ${savedBarbeiro.name}, pelo cadastro em nosso apliativo.<br>
                Respeitosamente,<br>
                Equipe do Full Coffee Overflow
            `,
        };
        await enviaEmail(feedbackEmail);
    },
    retornar: async (req: Request, res: Response): Promise<void> => {

        const barbeiros = await Barbeiro.findAll();

        res.json(barbeiros);
    },
    retornarPorId: async (req: Request, res: Response): Promise<void> => {
        const { barbeiroId } = req.params;

        const barbeiro = await Barbeiro.findById(barbeiroId);

        res.json(barbeiro);
    },
    deletarPorId: async (req: Request, res: Response): Promise<void> => {
        const { barbeiroId } = req.params;

        const barbeiro = await Barbeiro.findById(barbeiroId);

        await Auth.delete(barbeiro.authId);
        await Barbeiro.delete(barbeiroId);

        res.json(barbeiro);
    },
    atualizarPorId: async (req: Request, res: Response): Promise<void> => {
        const { password, name, birthdate, cep, phone, number, description } = req.body;
        const { usuarioId } = req.params;

        console.log(req.body.birthdate);

        const barbeiro = await Barbeiro.findById(usuarioId);
        if (barbeiro == null) {
            console.log('usuario is undefined! Bad usuarioID!');
            res.sendStatus(400);
            return;
        }

        console.log(req.body.password);

        const auth = await Auth.findById(barbeiro.authId);
        if (password !== undefined) {
            let hashedPassword: string;
            try {
                hashedPassword = await crypto.hashing(password);
            } catch (err) {
                console.log('Error while hashing the password.');
                console.log(err.message);
                res.sendStatus(500);
                return;
            }

            auth.password = hashedPassword;
            await Auth.save(auth);
        }

        barbeiro.name = name || barbeiro.name;
        barbeiro.birthdate = birthdate || barbeiro.birthdate;
        barbeiro.cep = cep || barbeiro.cep;
        barbeiro.phone = phone || barbeiro.phone;
        barbeiro.number = number || barbeiro.number;
        barbeiro.description = description || barbeiro.description;
        const savedBarbeiro = await Barbeiro.save(barbeiro);

        res.json(savedBarbeiro);

        const feedbackEmail: Email = {
            to: auth.email,
            from: 'no-reply-fco@fco.com.br',
            subject: 'Alteração do Cadastro',
            content: `
                Olá, ${savedBarbeiro.name}.<br>
                Seu cadastro foi alterado com sucesso. Veja seus novos dados:<br>
                Data de Aniversário: ${barbeiro.birthdate.toLocaleDateString}<br>
                CEP: ${barbeiro.cep}<br>
                Telefone: ${barbeiro.phone}<br>
                Respeitosamente,<br>
                Equipe do Full Coffee Overflow
            `,
        };  
        await enviaEmail(feedbackEmail);
    },
};

export default BarbeiroController;
