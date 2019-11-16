import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import configs from '../config/Config';

type payload = {
    authId: string;
    email: string;
    role: string;
};

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
    //Get the jwt token from the head
    const token = req.headers['auth'] as string;
    let jwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, configs.JWT_SECRET) as payload;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { authId, email, role } = jwtPayload;
    const newToken = jwt.sign(
        {
            authId,
            email,
            role,
        },
        configs.JWT_SECRET,
        { expiresIn: '1h' },
    );

    res.setHeader('token', newToken);

    //Call the next middleware or controller
    next();
};
