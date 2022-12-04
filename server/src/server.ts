import * as dotenv from 'dotenv'
dotenv.config({path: '../.env'});

import express from 'express'
import { getVehicles } from './trimet'




console.log('Hello from server.ts');
console.log(process.env.TRIMET_APP_ID);

const app = express();
const port = 3000;

async function main(): Promise<void> {
    const vehicles = await getVehicles();
    console.log(vehicles);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

main();
