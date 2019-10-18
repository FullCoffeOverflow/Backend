import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import configs from "../config/Config";
import crypto from "../utils/Crypto";

import Auth, { IAuth } from "../models/AuthModel";

const AuthController = {
  login: async (req: Request, res: Response) => {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    //Get user from database
    let auth: IAuth;
    try {
      auth = await Auth.findByEmail(email);
    } catch (error) {
      res.status(401).send();
      return;
    }

    const hasSamePassword = await crypto.comparing(password, auth.password)
    if(!hasSamePassword) {
      res.status(401).send();
      return;
    };

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { authId: auth.id, email: auth.email, role: auth.role },
      configs.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.send(token);
  },

  changePassword: async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    let auth: IAuth;
    try {
      auth = await Auth.findById(id);
    } catch (id) {
      res.status(401).send();
      return;
    }

    //Check if old password matchs
    const hasSamePassword= await crypto.comparing(oldPassword, auth.password);
    if (!hasSamePassword) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    auth.password = await crypto.hashing(newPassword);
    const savedAuth = await Auth.save(auth);
    console.log(`Saved new password for ${savedAuth.email}`);

    res.status(204).send();
  }
}

export default AuthController;
