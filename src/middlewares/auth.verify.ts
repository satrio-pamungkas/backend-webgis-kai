import { Request, Response, NextFunction } from 'express';
import { UserModel } from "../models/user.model";
import { ROLES } from '../config/config';
import { response400, response404, response500 } from '../specs/response.specs';

const checkDuplicateUsernameEmail = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const email = req.body.email;
    
    try {
        const user = await UserModel.findOne({ username: username });

        if (user) {
            const errorResponse = response400;
            errorResponse.errors[0].message = 'Username sudah digunakan';

            return res.status(400).json(errorResponse);
        }

        try {
            const user = await UserModel.findOne({ email: email });

            if (user) {
                const errorResponse = response400;
                errorResponse.errors[0].message = 'Email sudah digunakan';
    
                return res.status(400).json(errorResponse);
            }

            next();

        } catch {
            const errorResponse = response500;
            errorResponse.errors[0].message = 'Error';

            return res.status(500).json(errorResponse);
        }

    } catch {
        const errorResponse = response500;
        errorResponse.errors[0].message = 'Error';

        return res.status(500).json(errorResponse);
    }
};

const checkRoles = (req: Request, res: Response, next: NextFunction) => {
    const role = req.body.roles;

    if (role) {
        for (let i=0; i < role.length; i++) {
            if (!ROLES.includes(role[i])) {
                const errorResponse = response404;
                errorResponse.errors[0].message = 'Role tidak ditemukan';
    
                return res.status(404).json(errorResponse);
            }
        }
    }

    next();
};

export { checkDuplicateUsernameEmail, checkRoles };