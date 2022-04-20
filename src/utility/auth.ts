import * as jwt from 'jsonwebtoken';
import { user } from '../models/collection_models';
import { client as mongoClient } from '../app';
import bcrypt from 'bcryptjs';

const config = process.env;

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, config.JWT_TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

// maybe start the collection connections at start of app?
export const doesUserExist = async (payload) => {
    try {
        await mongoClient.connect();
        console.log('Connected successfully.');

        const db = mongoClient.db(config.DB_NAME);
        const collection = db.collection('users');
        const user = await collection.find({ email: payload.email }).toArray();

        let userResult = user[0] as user;
        if (
            (await bcrypt.compare(payload.password, userResult.passwordHash)) &&
            userResult.email == payload.email
        ) {
            return userResult;
        }
    } catch {
        console.log('error getting user');
        return null;
    } finally {
        await mongoClient.close();
    }
};
