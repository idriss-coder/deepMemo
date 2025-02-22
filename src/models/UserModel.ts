// src/models/User.ts
import {model, models, Schema} from "mongoose";
import {BaseResponse} from "@/models/base";

export interface IUser {
    email: string;
    pseudo: string;
    password: string; // mot de passe hashé
    createdAt: Date;
}

type NewUser = {
    id: string;
    email: string;
    pseudo: string;
    token: string;
}

export interface RegisterResponse extends BaseResponse {
    user: NewUser
}

export interface LoginResponse extends BaseResponse {
    token: string;
}

const userSchema = new Schema<IUser>({
    email: {type: String, unique: true, required: true},
    pseudo: {type: String, unique: false, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

// Evite les recompilations multiples en dev
const User = models.User || model<IUser>("User", userSchema);

export default User;
