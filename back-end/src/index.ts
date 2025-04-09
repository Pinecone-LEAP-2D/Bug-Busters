import express from 'express';
import { userRouter } from './routers/user.router';
import { profileRouter } from './routers/profile.router';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); 

const port = 8000;

app.use("/user", userRouter);
app.use("/profile", profileRouter);

app.listen(port, () => {
    console.log("Server started at http://localhost:" + port);
});

