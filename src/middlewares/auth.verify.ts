import { Request, Response, NextFunction } from 'express';
import { UserModel } from "../models/user.model";
import { ROLES } from '../config/config';

const checkDuplicateUsernameEmail = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const email = req.body.email;
    
    try {
        const user = await UserModel.findOne({ username: username });

        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        status: 400,
                        title: 'Bad Request',
                        message: 'Username sudah digunakan'
                    }
                ]
            }); 
        }

        try {
            const user = await UserModel.findOne({ email: email });

            if (user) {
                return res.status(400).json({
                    errors: [
                        {
                            status: 400,
                            title: 'Bad Request',
                            message: 'Username sudah digunakan'
                        }
                    ]
                }); 
            }

            next();

        } catch {
            return res.status(500).json({
                errors: [
                    {
                        status: 500,
                        title: 'Internal Server Error',
                        message: 'Gagal'
                    }
                ]
            });
        }

    } catch {
        return res.status(500).json({
            errors: [
                {
                    status: 500,
                    title: 'Internal Server Error',
                    message: 'Gagal'
                }
            ]
        });
    }
};

const checkRoles = (req: Request, res: Response, next: NextFunction) => {
    const role = req.body.roles;

    if (role) {
        for (let i=0; i < role.length; i++) {
            if (!ROLES.includes(role[i])) {
                return res.status(400).json({
                    errors: [
                        {
                            status: 400,
                            title: 'Bad Request',
                            message: 'Role tidak ditemukan'
                        }
                    ]
                }); 
            }
        }
    }

    next();
};

export { checkDuplicateUsernameEmail, checkRoles };