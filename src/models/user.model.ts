import { Schema, Types, model } from 'mongoose';

interface User {
    username: string;
    email: string;
    password: string;
    roles: Types.ObjectId;
};

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: Types.ObjectId,
        ref: 'roles',
    }
});

const UserModel = model<User>('users', UserSchema);
export { UserModel };
