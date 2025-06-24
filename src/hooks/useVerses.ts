import {useEffect, useState} from "react";
import {Verset} from "@/lib/db";
import VersetService from "@/service/VersetServie";


const versesService = new VersetService();

export const useVerses = (userId?: string, categoryId?: string) => {
    const [verses, setVerses] = useState<Verset[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchVerses = async () => {
        if (!userId && !categoryId) {
            setError("user_id ou category_id requis");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams();
            if (userId) params.append("user_id", userId);
            if (categoryId) params.append("category_id", categoryId);

            const res = await fetch(`/api/verses?${params.toString()}`);
            const data = await res.json();
            if (data.success) {
                setVerses(data.verses.map((verse: Verset) => ({...verse, id: verse._id})) || []);
            } else {
                setError(data.message || "Erreur lors du chargement");
            }
        } catch (err) {
            setError("Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    const createVerset = async (versetData: {
        book_num: number;
        chapter_num: number;
        verses_num: number[];
        content: string;
        user_id?: string;
        category_id?: string;
    }) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/verses", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(versetData),
            });
            const data = await res.json();
            if (data.success) {
                await fetchVerses();
                return true;
            } else {
                setError(data.message || "Erreur lors de la création");
                return false;
            }
        } catch (err) {
            setError("Erreur de connexion");
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchVerses();
    }, [userId, categoryId]);

    return {
        verses,
        loading,
        error,
        createVerset,
        refetch: fetchVerses
    };
};

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