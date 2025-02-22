// src/app/api/auth/register/route.ts
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User, {IUser} from "@/models/UserModel";
import {generateToken} from "@/lib/apiUtils";

export async function POST(request: Request) {
    try {
        const {email, password, pseudo} = <IUser>await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {success: false, message: "Champs email ou password manquants."},
                {status: 400}
            );
        }

        await dbConnect();

        // Vérifier si user existe déjà
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json(
                {success: false, message: "Cet email est déjà utilisé."},
                {status: 409}
            );
        }

        // Hasher le mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Créer le user
        const newUser = await User.create<IUser>({
            email,
            pseudo,
            password: hashedPassword
        });

        const token = generateToken({
            id: newUser._id,
            email: newUser.email
        })

        return NextResponse.json(
            {
                success: true,
                message: "Utilisateur créé avec succès.",
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    pseudo,
                    token
                }
            },
            {status: 201}
        );
    } catch (error: any) {
        console.error("Register error:", error);
        return NextResponse.json(
            {success: false, message: error.message || "Erreur de serveur"},
            {status: 500}
        );
    }
}
