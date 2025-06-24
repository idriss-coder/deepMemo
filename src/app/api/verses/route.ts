import dbConnect from "@/lib/dbConnect";
import VersetModel from "@/models/VersetModel";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const {book_num, chapter_num, verses_num, content, user_id, category_id} = body;

        if (!book_num || !chapter_num || !verses_num || !content) {
            return NextResponse.json(
                {success: false, message: "Les champs book_num, chapter_num, verses_num et content sont requis"},
                {status: 400}
            );
        }

        // Validation : au moins user_id OU category_id doit être fourni
        if (!user_id && !category_id) {
            return NextResponse.json(
                {success: false, message: "user_id ou category_id doit être fourni"},
                {status: 400}
            );
        }

        // Générer un local_id unique (simulation)
        const local_id = Date.now();

        const versetData: any = {
            book_num,
            chapter_num,
            verses_num,
            content,
            local_id,
            createdAt: new Date(),
        };

        // Ajouter user_id si fourni (pour les users)
        if (user_id) {
            versetData.user_id = user_id;
        }

        // Ajouter category_id si fourni (pour les admins)
        if (category_id) {
            versetData.category_id = category_id;
        }

        const verset = await VersetModel.create(versetData);

        return NextResponse.json({success: true, verset});
    } catch (error: any) {
        console.error("Erreur création verset:", error);
        return NextResponse.json(
            {success: false, message: error.message},
            {status: 500}
        );
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect();
        const {searchParams} = new URL(req.url);
        const user_id = searchParams.get("user_id");
        const category_id = searchParams.get("category_id");

        // Validation : au moins user_id OU category_id doit être fourni
        if (!user_id && !category_id) {
            return NextResponse.json(
                {success: false, message: "user_id ou category_id requis"},
                {status: 400}
            );
        }

        let filter: any = {};

        // Filtrer par user_id si fourni
        if (user_id) {
            filter.user_id = user_id;
        }

        // Filtrer par category_id si fourni
        if (category_id) {
            filter.category_id = category_id;
        }

        const verses = await VersetModel.find(filter).sort({createdAt: -1}).lean();
        return NextResponse.json({success: true, verses});
    } catch (error: any) {
        return NextResponse.json(
            {success: false, message: error.message},
            {status: 500}
        );
    }
} 