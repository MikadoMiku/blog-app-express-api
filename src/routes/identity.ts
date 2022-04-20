// TODO: login and return JWT, JWT used for authorization
import express from 'express';
import jwt from 'jsonwebtoken';
import { doesUserExist } from '../utility/auth';

const identityRouter = express.Router();

identityRouter.post('/login', async (req, res) => {
    console.log(req.body);
    let jwtToken = '';
    const user = await doesUserExist(req.body)
    if (user) {
        jwtToken = jwt.sign(
            { email: req.body.email, permissionLevel: user.permissionLevel },
            process.env.JWT_TOKEN_KEY,
            { expiresIn: '2h' }
        );
        res.status(201).send(jwtToken);
    } else {
        res.status(400).send('Bad credentials!');
    }
});

export default identityRouter;
