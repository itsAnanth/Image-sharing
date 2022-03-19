import multer from 'multer';
import express from 'express';
import Server from './modules/Server';
import cors from 'cors';
const app = express();
const PORT = Number(process.env.PORT) || 5000;
const includeMulter = multer().any();

app.use(cors());

app.use((req, res, next) => {
    includeMulter(req, res, next)
});

app.use(express.static('public'));

new Server(app, {
    PORT: PORT,
    methodsPath: './methods',
    autoHandle: true
});
