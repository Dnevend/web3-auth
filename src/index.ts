import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import responseMiddleware from './middlewares/responseMiddleware';
import ethCronJob from './cron/eth.cron';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseMiddleware);

app.use(routes)

ethCronJob.start();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
