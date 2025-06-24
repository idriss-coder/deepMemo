import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/models/CategoryModel";
import VersetModel from "@/models/VersetModel";
import {NextResponse} from "next/server";

export async function GET() {
    await dbConnect();
    try {
        // Récupérer toutes les catégories
        const categories = await CategoryModel.find().lean();
        
        // Pour chaque catégorie, récupérer les versets associés via category_id
        const categoriesWithVersets = await Promise.all(
            categories.map(async (category) => {
                const versets = await VersetModel.find({ category_id: category._id }).lean();
                return {
                    ...category,
                    versets
                };
            })
        );
        
        return NextResponse.json({success: true, categories: categoriesWithVersets});
    } catch (error: any) {
        return NextResponse.json(
            {success: false, message: error.message},
            {status: 500}
        );
    }
}

export async function POST(req: Request) {
    await dbConnect();
    const {name} = await req.json();
    if (!name) return NextResponse.json({success: false, message: "Name required"}, {status: 400});
    const category = await CategoryModel.create({name});
    return NextResponse.json({success: true, category});
}

export async function PUT(req: Request) {
    await dbConnect();
    const {id, name, versetId, action} = await req.json();
    if (!id) return NextResponse.json({success: false, message: "ID required"}, {status: 400});
    
    let update = {};
    if (name) update = {name};
    
    // Note: Les versets sont maintenant associés via category_id dans le modèle Verset
    // Cette logique est maintenue pour la compatibilité mais n'est plus nécessaire
    if (versetId && action === "add") {
        // Mettre à jour le verset pour l'associer à cette catégorie
        await VersetModel.findByIdAndUpdate(versetId, { category_id: id });
    }
    if (versetId && action === "remove") {
        // Retirer l'association du verset avec cette catégorie
        await VersetModel.findByIdAndUpdate(versetId, { $unset: { category_id: 1 } });
    }
    
    const category = await CategoryModel.findByIdAndUpdate(id, update, {new: true});
    return NextResponse.json({success: true, category});
}

export async function DELETE(req: Request) {
    await dbConnect();
    const {id} = await req.json();
    if (!id) return NextResponse.json({success: false, message: "ID required"}, {status: 400});
    
    // Supprimer la catégorie
    await CategoryModel.findByIdAndDelete(id);
    
    // Optionnel: Supprimer ou dissocier tous les versets de cette catégorie
    // await VersetModel.updateMany({ category_id: id }, { $unset: { category_id: 1 } });
    
    return NextResponse.json({success: true});
} 