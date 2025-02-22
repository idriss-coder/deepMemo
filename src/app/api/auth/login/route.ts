// src/app/api/auth/login/route.ts
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User, {IUser} from "@/models/UserModel";
import {generateToken} from "@/lib/apiUtils";


export async function POST(request: Request) {
    try {
        const {email, password} = <Partial<IUser>>await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {success: false, message: "Email ou password manquant."},
                {status: 400}
            );
        }

        await dbConnect();

        // Trouver l'utilisateur
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json(
                {success: false, message: "Utilisateur introuvable."},
                {status: 404}
            );
        }

        // Vérifier le password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return NextResponse.json(
                {success: false, message: "Mot de passe incorrect."},
                {status: 401}
            );
        }

        // Générer un token JWT
        const token = generateToken({
            id: user._id,
            email: user._email
        })

        return NextResponse.json({
            success: true,
            message: "Connexion réussie.",
            token
        });
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            {success: false, message: error.message || "Erreur de serveur"},
            {status: 500}
        );
    }
}
