import {useEffect, useState} from "react";
import {db, Verset} from "@/lib/db";

export const useVerses = () => {
    const [myVerses, setMyVerses] = useState<Verset[]>([]);

    useEffect(() => {
        const loadVerses = async () => {
            const foundVerses = await db.verses.toArray();
            setMyVerses(foundVerses?.reverse());
        }
        void loadVerses()

    }, []);

    return {myVerses}
}