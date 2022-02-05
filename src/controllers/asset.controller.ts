import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { AssetModel } from "../models/asset.model";
import { response400, response404, response500 } from "../specs/response.specs";

const getAllAssets = async (req: Request, res: Response) => {
    const assets = await AssetModel.find({});

    return res.status(200).json({
        data: assets
    });
};

const getAssetById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if(!isValidObjectId(id)) { 
        const errorResponse = response400;
        errorResponse.errors[0].message = 'Format parameter tidak sesuai spesifikasi';

        return res.status(400).json(errorResponse);
     }

    try {
        const asset = await AssetModel.findById({ '_id': id });

        if (!asset) {
            const errorResponse = response404;
            errorResponse.errors[0].message = `Id dengan ${id} tidak ditemukan`;
    
            return res.status(404).json(errorResponse);
        }

        return res.status(200).json({
            data: asset
        });

    } catch (error) {
        const errorResponse = response500;
        errorResponse.errors[0].message = 'Error';

        return res.status(500).json(errorResponse);
    }
    
};

const getPolygonAssets = async (req: Request, res: Response) => {
    const assets = await AssetModel.find({ 'location.type' : 'Polygon' });

    return res.status(200).json({
        data: assets
    });
};

const getPointAssets = async (req: Request, res: Response) => {
    const assets = await AssetModel.find({ 'location.type': 'Point' });

    return res.status(200).json({
        data: assets
    });
};

const createAsset = async (req: Request, res: Response) => {
    const asset = req.body;
    const created = AssetModel.create(asset);

    if (!created) {
        const errorResponse = response400;
        errorResponse.errors[0].message = 'Format tidak sesuai spesifikasi';

        return res.status(400).json(errorResponse);
    }

    return res.status(201).json({
        message: 'Berhasil ditambahkan'
    });
};

export { getAllAssets, getAssetById, getPointAssets, getPolygonAssets, createAsset };

