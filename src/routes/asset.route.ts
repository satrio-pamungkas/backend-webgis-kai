import { Router } from "express";
import { getAllAssets, getAssetById, getPointAssets, getPolygonAssets, createAsset } from "../controllers/asset.controller";

export const AssetRoute = () => {
    const router = Router();

    router.get('/assets', getAllAssets);
    router.get('/asset/:id', getAssetById);
    router.get('/assets/polygon', getPolygonAssets);
    router.get('/assets/point', getPointAssets);
    router.post('/assets', createAsset);

    return router;
}