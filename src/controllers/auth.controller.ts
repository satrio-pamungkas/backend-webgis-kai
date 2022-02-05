import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from '../models/user.model';
import { RoleModel } from '../models/role.model';
import { AuthConfig } from '../config/config';

const signUp = (req: Request, res: Response) => {
    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((error: any, user: any) => {
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

        RoleModel.find({ name: { $in: req.body.roles }}, (error: any, roles: any) => {
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

            user.roles = roles.map((role: any) => role._id);
            user.save((error: any) => {
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

                return res.status(201).json({
                    message: 'Berhasil ditambahkan'
                });
            });
        });
    });
};

const signIn = (req: Request, res: Response) => {
    UserModel.findOne({ username: req.body.username })
        .populate("roles", "-__v")
        .exec((error: any, user: any) => {
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

            if (!user) {
                return res.status(404).json({
                    errors: [
                        {
                            status: 404,
                            title: 'Not Found',
                            message: 'Default'
                        }
                    ]
                });
            }

            const passwordValid = bcrypt.compareSync(req.body.password, user.password);
            
            if (!passwordValid) {
                return res.status(401).json({
                    errors: [
                        {
                            status: 401,
                            title: 'Unauthorized',
                            message: 'Default'
                        }
                    ]
                });
            }

            const token = jwt.sign({ id: user.id }, AuthConfig.secret, {
                expiresIn: 86400
            });

            var authorities = [];

            for (let i=0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase())
            }

            return res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });

        });
};

export { signIn, signUp };