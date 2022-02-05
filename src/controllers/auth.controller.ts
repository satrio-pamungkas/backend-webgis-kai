import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from '../models/user.model';
import { RoleModel } from '../models/role.model';
import { AuthConfig } from '../config/config';
import { response401, response404, response500 } from '../specs/response.specs';

const signUp = (req: Request, res: Response) => {
    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((error: any, user: any) => {
        if (error) {
            const errorResponse = response500;
            errorResponse.errors[0].message = 'Error';

            return res.status(500).json(errorResponse);
        }

        RoleModel.find({ name: { $in: req.body.roles }}, (error: any, roles: any) => {
            if (error) {
                const errorResponse = response500;
                errorResponse.errors[0].message = 'Error';
    
                return res.status(500).json(errorResponse);
            }

            user.roles = roles.map((role: any) => role._id);
            user.save((error: any) => {
                if (error) {
                    const errorResponse = response500;
                    errorResponse.errors[0].message = 'Error';
        
                    return res.status(500).json(errorResponse);
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
                const errorResponse = response500;
                errorResponse.errors[0].message = 'Error';
    
                return res.status(500).json(errorResponse);
            }

            if (!user) {
                const errorResponse = response404;
                errorResponse.errors[0].message = 'Pengguna tidak terdaftar';
    
                return res.status(404).json(errorResponse);
            }

            const passwordValid = bcrypt.compareSync(req.body.password, user.password);
            
            if (!passwordValid) {
                const errorResponse = response401;
                errorResponse.errors[0].message = 'Kata sandi tidak sesuai';
    
                return res.status(401).json(errorResponse);
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