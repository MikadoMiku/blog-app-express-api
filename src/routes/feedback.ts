import express from 'express';
import { verifyToken } from '../utility/auth';
import { BaseService } from '../utility/connectToDb';
import { feedback } from '../models/collection_models';

const feedbackRouter = express.Router();
const service = new BaseService<feedback>('feedback');

feedbackRouter.get('/', verifyToken, async (req, res) => {
    res.status(200).send(await service.getAll());
});

feedbackRouter.post('/', verifyToken, async (req, res) => {
    await service.create(req.body);
    res.status(201).send(req.body);
});

export default feedbackRouter;
