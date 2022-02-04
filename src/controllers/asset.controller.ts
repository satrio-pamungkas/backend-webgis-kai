import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { AssetModel } from "../models/asset.model";

const getAllAssets = async (req: Request, res: Response) => {
    const assets = await AssetModel.find({});

    return res.status(200).json({
        data: assets
    });
};

const getAssetById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if(!isValidObjectId(id)) { 
        return res.status(400).json({
            errors: [
                {
                    status: 400,
                    title: 'Bad Request',
                    message: 'Invalid paramater'
                }
            ]
        }); 
     }

    try {
        const asset = await AssetModel.findById({ '_id': id });

        if (!asset) {
            return res.status(404).json({
                errors: [
                    {
                        status: 404,
                        title: 'Not Found',
                        message: `Id with ${id} not found`
                    }
                ]
            });
        }

        return res.status(200).json({
            data: asset
        });

    } catch (error) {
        console.log(error);
        res.status(500).send();
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
        return res.status(400).json({
            errors: [
                {
                    status: 400,
                    title: 'Bad Request',
                    message: 'Format tidak sesuai spesifikasi'
                }
            ]
        })
    }

    return res.status(201).json({
        message: 'Berhasil ditambahkan'
    });
};

export { getAllAssets, getAssetById, getPointAssets, getPolygonAssets, createAsset };

