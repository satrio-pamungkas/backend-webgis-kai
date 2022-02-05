import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import { checkDuplicateUsernameEmail, checkRoles } from "../middlewares/auth.verify";


export const AuthRoute = () => {
    const router = Router();

    router.post('/auth/signup', [checkDuplicateUsernameEmail, checkRoles], signUp);
    router.post('/auth/signin', signIn);
}