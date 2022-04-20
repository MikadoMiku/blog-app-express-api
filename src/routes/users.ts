import express, { Router } from "express"

const userRouter = express.Router()

userRouter.post("/", (req, res) => {
    res.send("Not implemented yet!")
})

userRouter.get("/:name", (req, res) => {
    res.send("Not implemented yet!")
})

userRouter
    .route("/:id")
    .put((req, res) => {
        res.send("Not implented yet!")
    })
    .delete((req, res) => {
        res.send("Not implented yet!")
    })

export default userRouter;
