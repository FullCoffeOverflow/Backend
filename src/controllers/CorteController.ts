import { Request, Response } from 'express';

import crypto from '../utils/Crypto';
import { enviaEmail, Email } from '../utils/Emailer';

import Auth, { AUTH_ROLES, AuthModel, AuthCollection } from '../models/AuthModel';
import Corte, { CorteModel, CorteCollection, CORTE_STATUS } from '../models/CorteModel';
import Barbeiro, { BarbeiroModel, BarbeiroCollection } from '../models/BarbeiroModel';
import Usuario, { UsuarioModel, UsuarioCollection } from '../models/UsuarioModel';

const CorteController = {
    adicionar: async (req: Request, res: Response): Promise<void> => {
        const { barbeiroId, usuarioId, horarioCorte } = req.body;

        const newCorte: CorteModel = new CorteCollection({
            usuarioId: usuarioId,
            barbeiroId: barbeiroId,
            fotosId: [],
            status: CORTE_STATUS.AGUARDANDO,
            horarioCorte: horarioCorte,
            avaliacao: 0,
        });

        let savedCorte: CorteModel;

        try {
            savedCorte = await Corte.save(newCorte);
        } catch (err) {
            console.log('Error while creating new corte.');
            console.log(err.message);
            res.status(400).json(err.message);
            return;
        }

        //Falta verificar o conflito de horários
        res.status(200).json(savedCorte);

        const barbeiro = await Barbeiro.findById(barbeiroId);
        const usuario = await Usuario.findById(usuarioId);

        const feedbackEmail: Email = {
            to: usuarioId.email,
            from: 'no-reply-fco@fco.com.br',
            subject: 'Novo Agendamento',
            content: `
                Caro ${usuario.name}, 
                Você realizou um agendamento pelo aplicativo El Bigodon <br>
                com o barbeiro  ${barbeiro.name}.
                <br>
                Respeitosamente,<br>
                Equipe do Full Coffee Overflow
            `,
        };
        await enviaEmail(feedbackEmail);
    },
    retornarPorId: async (req: Request, res: Response): Promise<void> => {
        const { corteId } = req.params;

        const corte = await Corte.findById(corteId);

        res.status(200).json(corte);
    },
    retornarPorStatus: async (req: Request, res: Response): Promise<void> => {
        const { status } = req.params;

        const corte = await Corte.findByStatus(status);

        res.status(200).json(corte);
    },
    retornarPorBarbeiroEStatus: async (req: Request, res: Response): Promise<void> => {
        const { barbeiroId, status } = req.params;

        const cortes = await Corte.finfByBarbeiroEStatus(status, barbeiroId);

        res.status(200).json(cortes);
    },
    retornarPorUsuarioEStatus: async (req: Request, res: Response): Promise<void> => {
        const { usuarioId, status } = req.params;

        const cortes = await Corte.finfByUsuarioEStatus(status, usuarioId);

        res.status(200).json(cortes);
    },
    
    atualizarPorId: async (req: Request, res: Response): Promise<void> => {
        const { avaliacao, status } = req.body;
        const { corteId } = req.params;

        const corte = await Corte.findById(corteId);

        if(corte.avalicao == -1){
            corte.avalicao = avaliacao || corte.avalicao;
        }
        
        corte.status = status || corte.status;

        const savedCorte = await Corte.save(corte);

        res.status(200).json(savedCorte);
    },
};

export default CorteController;
