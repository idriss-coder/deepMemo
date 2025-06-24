import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useProfile} from "@/hooks/_screens/useAuth";
import {useMemo} from "react";

// Hook pour récupérer les versets avec React Query
export const useVerses = (categoryId?: string) => {

    const {profile: user} = useProfile()

    const {data: verses = [], isLoading: loading, error, refetch} = useQuery({
        queryKey: ["verses", user?._id, categoryId],
        queryFn: async () => {
            if (!user && !categoryId) {
                throw new Error("user_id ou category_id requis");
            }

            const params = new URLSearchParams();

            if (categoryId) params.append("category_id", categoryId);
            else if (user) params.append("user_id", user?._id);

            const res = await fetch(`/api/verses?${params.toString()}`);
            const data = await res.json();
            if (data.success) {
                return data.verses || [];
            } else {
                throw new Error(data.message || "Erreur lors du chargement");
            }
        },
        enabled: !!(user?._id || categoryId),
    });

    const final = useMemo(() => verses?.map(v => ({...v, id: v?._id})), [verses]);

    return {
        verses: final,
        loading,
        error: error?.message || "",
        refetch
    };
};

// Hook pour les mutations de versets avec React Query
export const useVersetMutations = () => {
    const queryClient = useQueryClient();

    // Mutation pour créer un verset
    const createVersetMutation = useMutation({
        mutationFn: async (versetData: {
            book_num: number;
            chapter_num: number;
            verses_num: number[];
            content: string;
            user_id?: string;
            category_id?: string;
        }) => {
            const res = await fetch("/api/verses", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(versetData),
            });
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || "Erreur lors de la création");
            }
            return data.verset;
        },
        onSuccess: () => {
            // Invalider et refetch les versets
            queryClient.invalidateQueries({queryKey: ["verses"]});
        },
    });

    // Mutation pour mettre à jour un verset
    const updateVersetMutation = useMutation({
        mutationFn: async ({localId, content}: { localId: number; content: string }) => {
            const res = await fetch(`/api/verses/${localId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({content}),
            });
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || "Erreur lors de la mise à jour");
            }
            return data.verset;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["verses"]});
        },
    });

    // Mutation pour supprimer un verset
    const deleteVersetMutation = useMutation({
        mutationFn: async (localId: number) => {
            const res = await fetch(`/api/verses/${localId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || "Erreur lors de la suppression");
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["verses"]});
        },
    });

    return {
        createVerset: createVersetMutation.mutateAsync,
        updateVerset: updateVersetMutation.mutateAsync,
        deleteVerset: deleteVersetMutation.mutateAsync,
        isCreating: createVersetMutation.isPending,
        isUpdating: updateVersetMutation.isPending,
        isDeleting: deleteVersetMutation.isPending,
    };
};

export const useFetchRemoteVerses = () => {
    const {mutateAsync: fetchRemoteVerses, isPending: loading, error} = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/verses/sync");
            const data = await res.json();
            if (data.success) {
                return data.verses;
            } else {
                throw new Error(data.message || "Erreur lors de la synchronisation");
            }
        },
    });

    return {
        fetchRemoteVerses,
        loading,
        error: error?.message || ""
    };
};