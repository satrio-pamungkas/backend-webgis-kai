import { RoleModel } from "../models/role.model"

const databaseInit = () => {
    RoleModel.estimatedDocumentCount((error: any, count: any) => {
        if (!error && count === 0) {
            new RoleModel({
                name: 'penjagaan_asset',
                description: 'Role untuk CRUD penjagaan asset'
            }).save((error: any) => {
                if (error) {
                    console.log(error);
                }
                console.log("Berhasil menambahkan role penjagaan asset");
            });

            new RoleModel({
                name: 'pengusahaan_asset',
                description: 'Role untuk CRUD pengusahaan asset'
            }).save((error: any) => {
                if (error) {
                    console.log(error);
                }
                console.log("Berhasil menambahkan role pengusahaan asset");
            });
        }
    });
};

export { databaseInit };