import  express  from "express";
import { UserRoutes } from "./routes/user";

export const app = express();

app.use("/users", UserRoutes());

app.use(express.json())

export async function startWebServer() {
  return new Promise((resolve) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
      resolve(null);
    }); 
  });
}