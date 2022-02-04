import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { AssetRoute } from './src/routes/asset.route';

const app = express();

require('dotenv').config();

const PORT: any | string = process.env.PORT;
const DB_URI: any | string = process.env.DB_URI;

mongoose.connect(DB_URI);
mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/api', AssetRoute());

app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
});