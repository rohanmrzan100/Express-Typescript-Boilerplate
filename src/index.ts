import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import env from "./env";
import { ErrorHandler, handleNotFound } from "./middlewares/Error";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

let clienthost = "http://localhost:3000";
if (env.NODE_ENV !== "development") {
  clienthost = `${env.CLIENT_HOST}`;
}

const corsOptions = {
  origin: clienthost,
  credentials: true,
};

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors(corsOptions));

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.use(handleNotFound);
app.use(ErrorHandler);
async function main() {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

main();
