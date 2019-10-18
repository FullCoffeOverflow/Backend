import { Request, Response } from "express";

import crypto from "../utils/Crypto";

import Auth, { AUTH_ROLES, IAuth, AuthModel } from '../models/AuthModel';
import Usuario, { IUsuario, UsuarioModel } from "../models/UsuarioModel";

const UsuarioController = {
  cadastrar: async (req: Request, res: Response) => {
    const { email, password, name, birthdate, cep, phone} = req.body;

    let hashedPassword: string;
    try {
      hashedPassword = await crypto.hashing(password);
    } catch (err) {
      console.log('Error while hashing the password.');
      console.log(err.msg);
      res.sendStatus(500);
      return;
    }

    const newAuth: IAuth = new AuthModel({
      email,
      password: hashedPassword,
      role: AUTH_ROLES.USUARIO
    });

    const savedAuth = await Auth.save(newAuth);

    const newUsuario: IUsuario = new UsuarioModel({
      authId: savedAuth.id,
      name,
      birthdate,
      cep,
      phone
    });

    const savedUsuario = await Usuario.save(newUsuario);

    res.sendStatus(200);
  },
  retornarPorId: async (req: Request, res: Response) => {
    const { usuarioId } = req.params;

    const usuario = await Usuario.findById(usuarioId);

    res.json(usuario);
  },
  atualizarPorId: async (req: Request, res: Response) => {
    const { password, name, birthdate, cep, phone} = req.body;
    const { usuarioId } = req.params;

    console.log(req.body.birthdate)

    const usuario = await Usuario.findById(usuarioId);
    if(usuario == null)
    {
      console.log('usuario is undefined! Bad usuarioID!')
      res.sendStatus(400)
      return;
    }

    console.log(req.body.password)

    if (password !== undefined)
    {
      const auth = await Auth.findById(usuario.authId);

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

    usuario.name = name || usuario.name;
    usuario.birthdate = birthdate || usuario.birthdate;
    usuario.cep = cep || usuario.cep;
    usuario.phone = phone || usuario.phone;
    const savedUsuario = await Usuario.save(usuario);

    res.json(savedUsuario);
  }
}

export default UsuarioController;
