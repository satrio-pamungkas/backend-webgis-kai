const secretWord: any | string = process.env.SECRET

const AuthConfig = {
    secret: secretWord
};

const ROLES = ['penjagaan_asset','pengusahaan_asset'];

export { AuthConfig, ROLES };

