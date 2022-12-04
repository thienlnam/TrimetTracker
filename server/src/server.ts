import * as dotenv from 'dotenv'
dotenv.config({path: '../.env'});

import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import { getVehicles } from './trimet'




console.log('Hello from server.ts');
console.log(process.env.TRIMET_APP_ID);

const app = express();
const port = 3000;


// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/vehicles', async (req, res) => {
    const vehicles = await getVehicles();
    res.json(vehicles);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))