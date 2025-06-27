import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/models/CategoryModel";
import VersetModel from "@/models/VersetModel";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    await dbConnect();
    try {
        const {searchParams} = new URL(req.url);
        const includeDisabled = searchParams.get('includeDisabled') === 'true';
        const excludeVersets = searchParams.get('excludeVersets') === 'true';

        // Construire la requête en fonction du paramètre includeDisabled
        let query = {};
        if (!includeDisabled) {
            query = {isActive: true};
        }

        // Récupérer les catégories selon le filtre
        const categories = await CategoryModel.find(query).lean();

        console.log("Categories", categories);
        
        // Pour chaque catégorie, récupérer les versets associés via category_id
        const categoriesWithVersets = await Promise.all(
            categories.reverse().map(async (category) => {
                const versets = excludeVersets ? [] : await VersetModel.find({ category_id: category._id }).lean();
                return {
                    ...category,
                    versets: versets.reverse()
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

    // Créer la catégorie avec isActive: false par défaut
    const category = await CategoryModel.create({
        name,
        isActive: false // Par défaut, les nouvelles catégories sont désactivées
    });
    
    return NextResponse.json({success: true, category});
}

export async function PUT(req: Request) {
    await dbConnect();
    const {id, name, versetId, action, isActive} = await req.json();
    if (!id) return NextResponse.json({success: false, message: "ID required"}, {status: 400});
    
    let update = {};
    if (name !== undefined) update = {...update, name};
    if (isActive !== undefined) update = {...update, isActive};
    
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