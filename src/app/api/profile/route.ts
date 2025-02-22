import {NextResponse} from "next/server";
import User, {IUser} from "@/models/UserModel";
import {extractToken} from "@/lib/apiUtils";


export async function GET(request: Request) {
    try {


        const decoded = extractToken(request)

        if (!decoded) {
            return NextResponse.json({success: false, message: "Missing token"}, {status: 401});
        }

        const _user = <IUser & { _id: string }>await User.findOne({_id: decoded.userId})


        return NextResponse.json({
            success: true,
            message: "Accès autorisé",
            user: {
                _id: _user._id,
                email: _user.email,
                pseudo: _user.pseudo,
                createdAt: _user.createdAt,
            }
        });
    } catch (err: any) {
        return NextResponse.json(
            {
                success: false,
                message: "Token invalide"
            },
            {
                status: 401
            }
        )
    }
}
