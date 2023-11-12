import  express  from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "./database/data-source";

dotenv.config()

const app = express();

app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  
});