// models/VersetModel.ts
import mongoose, {Model, Schema} from "mongoose";

export interface IVerset {
    book_num: number
    chapter_num: number
    verses_num: number[]
    content: string
    createdAt: Date
    user_id: string
    local_id: number
}


const VersetSchema = new Schema(
    {
        local_id: {type: Number, required: true},
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        book_num: {type: Number, required: true},
        chapter_num: {type: Number, required: true},
        verses_num: {type: [Number], required: true},
        content: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
    },
    {
        timestamps: true,
    }
);

// Pour éviter de recréer le modèle si déjà existant (hot reload Next.js)
export default (mongoose.models.Verset as Model<IVerset>) ||
mongoose.model<IVerset>("Verset", VersetSchema);

