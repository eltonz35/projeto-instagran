import  express  from "express";
import dotenv from 'dotenv';


dotenv.config()

export const app = express();

app.use(express.json())

export async function startWebServer() {
  return new Promise((resolve) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
      resolve(null);
    }); 
  });
}