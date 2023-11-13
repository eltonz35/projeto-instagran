import dotenv from 'dotenv';
dotenv.config()

import { startWebServer } from "./app";
import { startDatabase } from "./database/app-data-source";



async function main() {
  try {
    await startDatabase();
    console.log(`Database initialized`);
    await startWebServer();
    console.log(`Web server initialized`);
  } catch (error) {
    console.log(error, "Error initializing app");
  }
}

main();