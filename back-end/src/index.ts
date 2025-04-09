import express from 'express';
import { userRouter } from './routers/user.router';

const app = express();
const port = 8000;

app.use("/user", userRouter);

app.listen(port, () => {
    console.log("Server started at http://localhost:" + port)
})