import {useState, useEffect} from "react";
import {Category} from "../_types";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchCategories = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/categories");
            const data = await res.json();
            if (data.success) {
                setCategories(data.categories || []);
            } else {
                setError(data.message || "Erreur lors du chargement");
            }
        } catch (err) {
            setError("Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (name: string) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name}),
            });
            const data = await res.json();
            if (data.success) {
                await fetchCategories();
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

    const updateCategory = async (id: string, name: string) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/categories", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id, name}),
            });
            const data = await res.json();
            if (data.success) {
                await fetchCategories();
                return true;
            } else {
                setError(data.message || "Erreur lors de la mise à jour");
                return false;
            }
        } catch (err) {
            setError("Erreur de connexion");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id: string) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/categories", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id}),
            });
            const data = await res.json();
            if (data.success) {
                await fetchCategories();
                return true;
            } else {
                setError(data.message || "Erreur lors de la suppression");
                return false;
            }
        } catch (err) {
            setError("Erreur de connexion");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const createVersetAndAddToCategory = async (
        categoryId: string,
        versetData: {
            book_num: number;
            chapter_num: number;
            verses_num: number[];
            content: string;
        }
    ) => {
        setLoading(true);
        setError("");
        try {
            // Créer le verset avec category_id (contexte admin)
            const versetRes = await fetch("/api/verses", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...versetData,
                    category_id: categoryId // Admin context: utiliser category_id au lieu de user_id
                }),
            });
            
            const versetDataResult = await versetRes.json();
            if (!versetDataResult.success) {
                setError(versetDataResult.message || "Erreur lors de la création du verset");
                return false;
            }

            // Le verset est déjà associé à la catégorie via category_id
            // Rafraîchir la liste des catégories pour voir le nouveau verset
            await fetchCategories();
            return true;
        } catch (err) {
            setError("Erreur de connexion");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const addVersetToCategory = async (categoryId: string, versetId: string) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/categories", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: categoryId, versetId, action: "add"}),
            });
            const data = await res.json();
            if (data.success) {
                await fetchCategories();
                return true;
            } else {
                setError(data.message || "Erreur lors de l'ajout du verset");
                return false;
            }
        } catch (err) {
            setError("Erreur de connexion");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeVersetFromCategory = async (categoryId: string, versetId: string) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/categories", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: categoryId, versetId, action: "remove"}),
            });
            const data = await res.json();
            if (data.success) {
                await fetchCategories();
                return true;
            } else {
                setError(data.message || "Erreur lors de la suppression du verset");
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
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
        createVersetAndAddToCategory,
        addVersetToCategory,
        removeVersetFromCategory,
        refetch: fetchCategories
    };
}; 