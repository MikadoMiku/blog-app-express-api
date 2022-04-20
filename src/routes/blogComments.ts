import express from "express"
import { verifyToken } from "../utility/auth"
import { BaseService } from "../utility/connectToDb"
import { blogComment } from "../models/collection_models"

const blogCommentRouter = express.Router()
const service = new BaseService<blogComment>("comments");

blogCommentRouter.get("/", verifyToken,async (req, res) => {
    console.log("getting comments")
    res.status(200).send(await service.getAll())
})

blogCommentRouter.post("/",verifyToken, async (req, res) => {
    console.log(req.body)
    await service.create(req.body)
    res.status(201).send(req.body)
})

blogCommentRouter
    .route("/:id")
    .get(verifyToken, async (req, res) => {
        res.status(200).send(await service.getAll({id: req.params.id}))
    })
    .put(verifyToken, async (req, res) => {
        res.status(201).send(await service.update(req.params.id, req.body))
    })
    .delete(verifyToken, async (req, res) => {
        res.status(201).send(await service.delete(req.params.id))
    })

export default blogCommentRouter
