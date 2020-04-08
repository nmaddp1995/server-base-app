import express from 'express';
import bodyParser from 'body-parser';

import InitiateMongoServer from './config/db';
import user from './routes/user';
import { PORT } from './config/envConfig';

InitiateMongoServer();

const app = express();

// middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'API Working'});
});

app.use('/user', user);

app.listen(PORT, (req, res) => {
    console.log(`Server started ad PORT ${PORT}`);
});
