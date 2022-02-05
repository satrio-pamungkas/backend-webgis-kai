import jwt, { verify, } from 'jsonwebtoken';
import { AuthConfig } from '../config/config';
import { UserModel } from '../models/user.model';
import { RoleModel } from '../models/role.model';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers['authorization'];

    if (!bearer) {
        return res.status(403).json({
            errors: [
                {
                    status: 403,
                    title: 'Forbidden',
                    message: 'Token tidak ada'
                }
            ]
        });
    }

    jwt.verify(bearer, AuthConfig.secret, (error: any, decoded: any) => {
        if (error) {
            return res.status(401).json({
                errors: [
                    {
                        status: 401,
                        title: 'Unauthorized',
                        message: 'Tidak diizinkan akses tanpa akun'
                    }
                ]
            });
        }

        req.body.userId = decoded.id;
        next();
    });
};

const isPengusahaanAsset = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;

    UserModel.findById(userId).exec((error: any, user: any) => {
        if (error) {
            return res.status(500).json({
                errors: [
                    {
                        status: 500,
                        title: 'Internal Server Error',
                        message: 'Default'
                    }
                ]
            });
        }

        RoleModel.find({ _id: { $in: user.roles }}, (error: any, roles: any) => {
            if (error) {
                return res.status(500).json({
                    errors: [
                        {
                            status: 500,
                            title: 'Internal Server Error',
                            message: 'Default'
                        }
                    ]
                });
            }

            for (let i=0; i < roles.length; i++) {
                if (roles[i].name == "pengusahaan_asset") {
                    next();
                    return;
                }
            }

            return res.status(403).json({
                errors: [
                    {
                        status: 403,
                        title: 'Forbidden',
                        message: 'Default'
                    }
                ]
            });
        });
    });
};

const isPenjagaanAsset = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;

    UserModel.findById(userId).exec((error: any, user: any) => {
        if (error) {
            return res.status(500).json({
                errors: [
                    {
                        status: 500,
                        title: 'Internal Server Error',
                        message: 'Default'
                    }
                ]
            });
        }

        RoleModel.find({ _id: { $in: user.roles }}, (error: any, roles: any) => {
            if (error) {
                return res.status(500).json({
                    errors: [
                        {
                            status: 500,
                            title: 'Internal Server Error',
                            message: 'Default'
                        }
                    ]
                });
            }

            for (let i=0; i < roles.length; i++) {
                if (roles[i].name == "penjagaan_asset") {
                    next();
                    return;
                }
            }

            return res.status(403).json({
                errors: [
                    {
                        status: 403,
                        title: 'Forbidden',
                        message: 'Default'
                    }
                ]
            });
        });
    });
};

export { verifyToken, isPengusahaanAsset, isPenjagaanAsset };

