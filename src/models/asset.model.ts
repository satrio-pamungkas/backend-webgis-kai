import mongoose, { Schema, model, Document, Types } from 'mongoose';

interface Geo {
    type: string;
    coordinates: number[][][];
};

interface Properties {
    name: string;
    price: string;
    type: string;
    address: string;
    area: string;
    description: string;
};

interface GeoAssets {
    location: Types.ObjectId;
    properties: Types.ObjectId;
};

const GeoSchema = new Schema<Geo>({
    type: {
        type: String,
        enum: ['Point','Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]],
    }
});

const PropertiesSchema = new Schema<Properties>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    price: {
        type: String,
    },
    type: {
        type: String,
    },
    address: {
        type: String,
    },
    area: {
        type: String,
    },
    description: {
        type: String,
    },
});

const GeoAssetSchema = new Schema<GeoAssets>({
    location: GeoSchema,
    properties: PropertiesSchema,
});

const AssetModel = model<GeoAssets>('assets', GeoAssetSchema);
export { AssetModel };