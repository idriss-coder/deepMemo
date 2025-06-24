import mongoose, {Model, Schema} from "mongoose";

export interface ICategory {
    name: string;
    isActive: boolean;
    createdAt: Date;
}

const CategorySchema = new Schema(
    {
        name: {type: String, required: true},
        isActive: {type: Boolean, default: false},
        createdAt: {type: Date, default: Date.now},
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.Category as Model<ICategory>) ||
    mongoose.model<ICategory>("Category", CategorySchema); 