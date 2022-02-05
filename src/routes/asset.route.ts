import { Router } from "express";
import { getAllAssets, getAssetById, getPointAssets, getPolygonAssets, createAsset } from "../controllers/asset.controller";
import { isPenjagaanAsset, verifyToken } from "../middlewares/auth.jwt";

export const AssetRoute = () => {
    const router = Router();

    router.get('/assets', [verifyToken, isPenjagaanAsset], getAllAssets);
    router.get('/asset/:id', getAssetById);
    router.get('/assets/polygon', getPolygonAssets);
    router.get('/assets/point', getPointAssets);

    router.post('/assets', [verifyToken, isPenjagaanAsset], createAsset);

    return router;
}