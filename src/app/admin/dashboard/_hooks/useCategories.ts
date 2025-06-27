import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

// Hook pour récupérer les catégories avec React Query
export const useCategories = ({includeDisabled = true, excludeVersets = false}: { includeDisabled?: boolean, excludeVersets?: boolean }) => {
    const queryClient = useQueryClient();

    const {data: categories = [], isLoading: loading, error, refetch} = useQuery({
        queryKey: ["categories", includeDisabled, excludeVersets],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (includeDisabled) {
                params.append("includeDisabled", "true");
            }
            if (excludeVersets) {
                params.append("excludeVersets", "true");
            }
            const res = await fetch(`/api/categories?${params.toString()}`);
            const data = await res.json();
            if (data.success) {
                return data?.categories || [];
            } else {
                throw new Error(data.message || "Erreur lors du chargement");
            }
        },
    });

    // Mutation pour créer une catégorie
    const createCategoryMutation = useMutation({
        mutationFn: async (name: string) => {
            const loadId = toast.loading("Operation en cour...")
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name}),
            });
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || "Erreur lors de la création");
            }
            toast.dismiss(loadId)
            return data.category;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });

    // Mutation pour mettre à jour une catégorie
    const updateCategoryMutation = useMutation({
        mutationFn: async ({id, name}: { id: string; name: string }) => {
            const loadId = toast.loading("Operation en cour...")
            const res = await fetch("/api/categories", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id, name}),
            });
            const data = await res.json();
            toast.dismiss(loadId)
            if (!data.success) {
                throw new Error(data.message || "Erreur lors de la mise à jour");
            }
            return data.category;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });

    // Mutation pour toggle l'état actif d'une catégorie
    const toggleActiveMutation = useMutation({
        mutationFn: async ({id, isActive}: { id: string; isActive: boolean }) => {
            const loadId = toast.loading("Operation en cour...")
            const res = await fetch("/api/categories", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id, isActive}),
            });
            const data = await res.json();
            toast.dismiss(loadId)
            if (!data.success) {
                throw new Error(data.message || "Erreur lors de la mise à jour");
            }
            return data.category;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });

    // Mutation pour supprimer une catégorie
    const deleteCategoryMutation = useMutation({
        mutationFn: async (id: string) => {
            const loadId = toast.loading("Operation en cour...")
            const res = await fetch("/api/categories", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id}),
            });
            const data = await res.json();
            toast.dismiss(loadId)
            if (!data.success) {
                throw new Error(data.message || "Erreur lors de la suppression");
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });

    // Mutation pour créer un verset et l'ajouter à une catégorie
    const createVersetAndAddToCategoryMutation = useMutation({
        mutationFn: async ({
                               categoryId,
                               versetData
                           }: {
            categoryId: string;
            versetData: {
                book_num: number;
                chapter_num: number;
                verses_num: number[];
                content: string;
            };
        }) => {
            // Créer le verset avec category_id (contexte admin)
            const loadId = toast.loading("Operation en cour...")

            const versetRes = await fetch("/api/verses", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...versetData,
                    category_id: categoryId // Admin context: utiliser category_id au lieu de user_id
                }),
            });
            const versetDataResult = await versetRes.json();
            toast.dismiss(loadId)
            if (!versetDataResult.success) {
                throw new Error(versetDataResult.message || "Erreur lors de la création du verset");
            }

            return versetDataResult.verset;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });

    // Mutation pour ajouter un verset à une catégorie
    const addVersetToCategoryMutation = useMutation({
        mutationFn: async ({categoryId, versetId}: { categoryId: string; versetId: string }) => {
            const loadId = toast.loading("Operation en cour...")
            const res = await fetch("/api/categories", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: categoryId, versetId, action: "add"}),
            });
            const data = await res.json();
            toast.dismiss(loadId)
            if (!data.success) {
                throw new Error(data.message || "Erreur lors de l'ajout du verset");
            }
            return data;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });

    // Mutation pour supprimer un verset d'une catégorie
    const removeVersetFromCategoryMutation = useMutation({
        mutationFn: async ({categoryId, versetId}: { categoryId: string; versetId: string }) => {
            const loadId = toast.loading("Operation en cour...")
            const res = await fetch("/api/categories", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: categoryId, versetId, action: "remove"}),
            });
            const data = await res.json();
            toast.dismiss(loadId)
            if (!data.success) {
                throw new Error(data.message || "Erreur lors de la suppression du verset");
            }
            return data;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });

    return {
        categories,
        loading,
        error: error?.message || "",
        createCategory: createCategoryMutation.mutateAsync,
        updateCategory: updateCategoryMutation.mutateAsync,
        toggleActive: toggleActiveMutation.mutateAsync,
        deleteCategory: deleteCategoryMutation.mutateAsync,
        createVersetAndAddToCategory: createVersetAndAddToCategoryMutation.mutateAsync,
        addVersetToCategory: addVersetToCategoryMutation.mutateAsync,
        removeVersetFromCategory: removeVersetFromCategoryMutation.mutateAsync,
        refetch,
        // États de chargement pour les mutations
        isCreating: createCategoryMutation.isPending,
        isUpdating: updateCategoryMutation.isPending,
        isToggling: toggleActiveMutation.isPending,
        isDeleting: deleteCategoryMutation.isPending,
        isCreatingVerset: createVersetAndAddToCategoryMutation.isPending,
        isAddingVerset: addVersetToCategoryMutation.isPending,
        isRemovingVerset: removeVersetFromCategoryMutation.isPending,
    };
}; 