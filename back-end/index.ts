import express from "express";
import cors from "cors";
import { bankCardRouter } from "./src/routers/bankCard.router";
import { userRouter } from "./src/routers/user.router";
import { profileRouter } from "./src/routers/profile.router";
import { DonationRouter } from "./src/routers/donation.router";



const app = express();
app.use(express.json());
app.use(cors());

const port = 8001;

app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/donation", DonationRouter);
app.use("/bankCard", bankCardRouter);

app.listen(port, () => {
  console.log("Server started at http://localhost:" + port);
});
