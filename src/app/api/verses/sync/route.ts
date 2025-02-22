import dbConnect from "@/lib/dbConnect";
import {OutboxItem} from "@/lib/db";
import VersetModel from "@/models/VersetModel";
import {NextResponse} from "next/server";
import {extractToken} from "@/lib/apiUtils";


export async function GET(request: Request) {
    try {
        const decoded = extractToken(request)

        if (!decoded) {
            return NextResponse.json({success: false, message: "Missing token"}, {status: 401});
        }

        await dbConnect();

        const {searchParams} = new URL(request.url);
        const sinceParam = searchParams.get("since");

        let filter = {};

        if (sinceParam) {
            const sinceDate = new Date(sinceParam);

            if (!isNaN(sinceDate.valueOf())) {
                filter = {updatedAt: {$gt: sinceDate}};
            }
        }

        const verses = await VersetModel.find({...filter, user_id: decoded.userId}).sort({updatedAt: 1}).lean();

        return NextResponse.json({success: true, verses});
    } catch (error: any) {
        return NextResponse.json(
            {success: false, message: error.message},
            {status: 500}
        );
    }
}


export async function POST(req: Request) {

    console.log("Request (:api) handler")

    try {
        await dbConnect();

        const body = await <Promise<{ changes: OutboxItem[] }>>await req.json();
        const {changes} = body;

        console.log(changes)

        if (!Array.isArray(changes)) {
            return Response.json({message: "Missing or invalid 'changes' array."}, {status: 400});
        }

        const updatedItems = [];

        for (const change of changes) {
            const {type, payload} = change;

            console.log(`=====================${payload.user_id}`)

            const bdData = await VersetModel.findOne({local_id: payload.id})

            switch (type) {
                case "CREATE": {
                    const doc = new VersetModel({
                        user_id: payload.user_id,
                        local_id: payload.id,
                        book_num: payload.book_num,
                        chapter_num: payload.chapter_num,
                        verses_num: payload.verses_num,
                        content: payload.content,
                        createdAt: payload.createdAt || new Date(),
                    });
                    const saved = await doc.save();
                    updatedItems.push(saved);
                    break;
                }

                case "UPDATE": {
                    if (!payload.id || !bdData) break; // ou lever une erreur
                    const updated = await VersetModel.findByIdAndUpdate(
                        bdData._id,
                        {
                            book_num: payload.book_num,
                            chapter_num: payload.chapter_num,
                            verses_num: payload.verses_num,
                            content: payload.content,
                        },
                        {new: true}
                    );
                    if (updated) {
                        updatedItems.push(updated);
                    }
                    break;
                }

                case "DELETE": {
                    if (!payload.id || !bdData) break; // ou lever une erreur
                    await VersetModel.findByIdAndDelete(bdData._id);
                    break;
                }

                default:
                    break;
            }
        }

        return Response.json({success: true, updatedItems}, {status: 200});
    } catch (err: any) {
        console.error("Sync error:", err);
        return Response.json({success: false, error: err.toString()}, {status: 500});
    }
}
