import { Router } from "express";
import { getAllAssets } from "../controllers/asset.controller";

export const AssetRoute = () => {
    const router = Router();

    router.get('/assets', getAllAssets);

    return router;
}