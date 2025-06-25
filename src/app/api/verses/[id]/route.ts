import dbConnect from "@/lib/dbConnect";
import VersetModel from "@/models/VersetModel";
import {NextResponse} from "next/server";

// Mettre à jour un verset
export async function PUT(
    req: Request,
    {params}: {params: {id: string}}
) {
    try {
        await dbConnect();
        const {id} = params;
        const {content} = await req.json();

        if (!content) {
            return NextResponse.json(
                {success: false, message: "Le contenu est requis"},
                {status: 400}
            );
        }

        const verset = await VersetModel.findOneAndUpdate(
            {local_id: parseInt(id)},
            {content},
            {new: true}
        );

        if (!verset) {
            return NextResponse.json(
                {success: false, message: "Verset non trouvé"},
                {status: 404}
            );
        }

        return NextResponse.json({success: true, verset});
    } catch (error: any) {
        console.error("Erreur mise à jour verset:", error);
        return NextResponse.json(
            {success: false, message: error.message},
            {status: 500}
        );
    }
}

// Supprimer un verset
export async function DELETE(
    req: Request,
    {params}: {params: {id: string}}
) {
    try {
        await dbConnect();
        const {id} = params;

        const verset = await VersetModel.findOneAndDelete({local_id: parseInt(id)});

        if (!verset) {
            return NextResponse.json(
                {success: false, message: "Verset non trouvé"},
                {status: 404}
            );
        }

        return NextResponse.json({success: true, message: "Verset supprimé"});
    } catch (error: any) {
        console.error("Erreur suppression verset:", error);
        return NextResponse.json(
            {success: false, message: error.message},
            {status: 500}
        );
    }
} 