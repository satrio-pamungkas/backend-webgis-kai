import { Request, Response } from "express";
import { AssetModel } from "../models/asset.model";

const getAllAssets = async (req: Request, res: Response) => {
    const assets = await AssetModel.find({});

    return res.status(200).json({
        data: assets
    });
};

export { getAllAssets };

