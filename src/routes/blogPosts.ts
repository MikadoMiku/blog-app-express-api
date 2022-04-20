import express, { Router } from 'express';
import { verifyToken } from '../utility/auth';
import { BaseService } from '../utility/connectToDb';
import { blogPost } from '../models/collection_models';

const blogPostRouter = express.Router();
const service = new BaseService<blogPost>('blogPosts');

blogPostRouter.get('/', verifyToken, async (req, res) => {
    console.log('Requested posts.');
    res.status(200).send(await service.getAll({ id: req.query.id }));
});

blogPostRouter.post('/', verifyToken, async (req, res) => {
    await service.create(req.body);
    res.status(201).send(req.body);
});

blogPostRouter
    .route('/:id')
    .get(verifyToken, async (req, res) => {
        res.status(200).send(await service.getOne(req.params.id));
    })
    .put(verifyToken, async (req, res) => {
        res.status(201).send(await service.update(req.params.id, req.body));
    })
    .delete(verifyToken, async (req, res) => {
        res.status(201).send(await service.delete(req.params.id));
    });

export default blogPostRouter;
