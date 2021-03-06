import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { AssetRoute } from './src/routes/asset.route';
import { databaseInit } from './src/utils/db.init';
import { AuthRoute } from './src/routes/auth.route';

const app = express();

require('dotenv').config();

const PORT: any | string = process.env.PORT;
const DB_URI: any | string = process.env.DB_URI;

mongoose.connect(DB_URI).then(() => {
    console.log("Berhasil terhubung ke database");
    databaseInit();
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/', AuthRoute());
app.use('/api', AssetRoute());

app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
});