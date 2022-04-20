require('dotenv').config();
import express from 'express';
import cors from 'cors';
import blogPostRouter from './routes/blogPosts';
import userRouter from './routes/users';
import identityRouter from './routes/identity';
import blogCommentRouter from './routes/blogComments';
import { MongoClient } from 'mongodb';
import feedbackRouter from './routes/feedback';

export const client = new MongoClient(process.env.DB_CONN_STRING);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/blogPost', blogPostRouter);
app.use('/user', userRouter);
app.use('/identity', identityRouter);
app.use('/blogComment', blogCommentRouter);
app.use('/feedback', feedbackRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    return console.log(
        `Express is listening at http://localhost:${process.env.SERVER_PORT}`
    );
});
