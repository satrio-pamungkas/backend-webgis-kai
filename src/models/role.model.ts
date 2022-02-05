import { Schema, model } from 'mongoose';

interface Role {
    name: string;
    description: string;
};

const RoleSchema = new Schema<Role>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const RoleModel = model<Role>('roles', RoleSchema);
export { RoleModel };