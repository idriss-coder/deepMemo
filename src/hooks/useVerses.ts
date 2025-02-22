import {useEffect, useState} from "react";
import {db, Verset} from "@/lib/db";
import VersetService from "@/service/VersetServie";


const versesService = new VersetService();

export const useVerses = () => {
    const [myVerses, setMyVerses] = useState<Verset[]>();

    useEffect(() => {
        const loadVerses = async () => {
            const foundVerses = await db.verses.toArray();
            setMyVerses(foundVerses?.reverse());
        }
        void loadVerses()

    }, []);

    return {myVerses}
}

export const useFetchRemoteVerses = () => {
    const [loading, setLoading] = useState(false);
    const handlerFetch = async () => {
        setLoading(true);
        void versesService.fetchModiff()
        setLoading(false)
    }

    return {
        loading,
        handlerFetch
    }
}