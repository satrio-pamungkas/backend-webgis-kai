import jwt, { verify, } from 'jsonwebtoken';
import { AuthConfig } from '../config/config';
import { UserModel } from '../models/user.model';
import { RoleModel } from '../models/role.model';
import { Request, Response, NextFunction, response } from 'express';
import { response401, response403, response500 } from '../specs/response.specs';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers['authorization'];

    if (!bearer) {
        const errorResponse = response403;
        errorResponse.errors[0].message = 'Token tidak ada';

        return res.status(403).json(errorResponse);
    }

    jwt.verify(bearer, AuthConfig.secret, (error: any, decoded: any) => {
        if (error) {
            const errorResponse = response401;
            errorResponse.errors[0].message = 'Tidak diizinkan akses tanpa akun';

            return res.status(401).json(errorResponse);
        }

        req.body.userId = decoded.id;
        next();
    });
};

const isPengusahaanAsset = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;

    UserModel.findById(userId).exec((error: any, user: any) => {
        if (error) {
            const errorResponse = response500;
            errorResponse.errors[0].message = 'Error';

            return res.status(500).json(errorResponse);
        }

        RoleModel.find({ _id: { $in: user.roles }}, (error: any, roles: any) => {
            if (error) {
                const errorResponse = response500;
                errorResponse.errors[0].message = 'Error';
    
                return res.status(500).json(errorResponse);
            }

            for (let i=0; i < roles.length; i++) {
                if (roles[i].name == "pengusahaan_asset") {
                    next();
                    return;
                }
            }

            const errorResponse = response403;
            errorResponse.errors[0].message = 'Akses dilarang';
    
            return res.status(403).json(errorResponse);
        });
    });
};

const isPenjagaanAsset = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;

    UserModel.findById(userId).exec((error: any, user: any) => {
        if (error) {
            const errorResponse = response500;
            errorResponse.errors[0].message = 'Error';

            return res.status(500).json(errorResponse);
        }

        RoleModel.find({ _id: { $in: user.roles }}, (error: any, roles: any) => {
            if (error) {
                const errorResponse = response500;
                errorResponse.errors[0].message = 'Error';
    
                return res.status(500).json(errorResponse);
            }

            for (let i=0; i < roles.length; i++) {
                if (roles[i].name == "penjagaan_asset") {
                    next();
                    return;
                }
            }

            const errorResponse = response403;
            errorResponse.errors[0].message = 'Akses dilarang';
    
            return res.status(403).json(errorResponse);
        });
    });
};

export { verifyToken, isPengusahaanAsset, isPenjagaanAsset };

