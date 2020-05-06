import express from 'express';
import { resolve } from 'path';
import routes from './routes';
import './database/index';
import uploadConfig from './config/uploadConfig';

const app = express();

const dir = resolve(__dirname, '..', 'tmp');
app.use(express.json());
app.use('/files', express.static(dir));
app.use(routes);

app.listen(3333, () => {
  console.log('servidor está rodando');
});
