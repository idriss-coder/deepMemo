import {db, MyAppDatabase, Verset} from "@/lib/db";
import {isOnline} from "@/lib/utils";
import {AuthManagerGuard} from "@/service/AuthManager";
import {BaseResponse} from "@/models/base";

let isSyncing = false;

export default class VersetService extends MyAppDatabase {

    async deleteVerset(id: number) {
        console.info("VersetService deleting verset", id);
        const versetData = await db.verses.get(+id)
        await db.verses.delete(+id)
        if (versetData) {
            await this.versesOutbox.add({
                type: "DELETE",
                payload: versetData,
                createdAt: new Date()
            })
        }
    }

    async updateVerset(id: number, description: string) {
        await db.verses.update(+id, {content: description})
        const versetData = await db.verses.get(+id)
        if (versetData) {
            await this.versesOutbox.add({
                type: "UPDATE",
                payload: versetData,
                createdAt: new Date()
            })
        }
    }

    async addVerset(newVerset: Verset) {
        const localId = await this.verses.add(newVerset);
        await this.addVersetToBulk({...newVerset, id: localId})
    }

    async addVersetToBulk(verset: Verset) {
        await this.versesOutbox.add({
            type: 'CREATE',
            payload: verset,
            createdAt: new Date()
        });
    }


    async syncWithServer() {
        if (!isOnline()) {
            console.log("Your're not offline!");
            return
        }
        console.log(`Try to sync, ${isSyncing}`)
        if (isSyncing) return
        const pendingChanges = await this.versesOutbox.toArray();
        if (!pendingChanges.length) return;

        try {
            isSyncing = true
            const res = await fetch('/api/verses/sync', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({changes: pendingChanges}),
            });

            if (!res.ok) {
                isSyncing = false
                throw new Error(`Erreur serveur: ${res.status}`);
            }

            const serverData: Verset[] = await res.json();

            console.log(serverData)
            await this.versesOutbox.clear();
            console.log("Sync réussie !");
            isSyncing = false
        } catch (err) {
            console.error("Sync échouée:", err);
            isSyncing = false
        }
    }


    async fetchModiff() {
        const _token = AuthManagerGuard.getToken();

        try {
            // 1. Récupération des versets en local
            const localVerses = await db.verses.toArray();

            // Map pour accès rapide via l'id local
            const localMap = new Map(localVerses.map((verse) => [verse.id, verse]));

            // 2. Requête au serveur
            const res = await fetch("/api/verses/sync", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${_token}`,
                },
            });

            // Récupération des données
            const data: BaseResponse & { verses: LVerset[] } = await res.json();

            // Gestion des erreurs ou redirection si token invalide
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.replace("/auth/login");
                }
                throw new Error(data.message);
            }

            // Tableaux pour stocker ce qui est à ajouter ou à mettre à jour
            const newVersesToAdd: Verset[] = [];
            const versesToReplace: Verset[] = [];
            const versesToDelete: number[] = [];

            // 3. Parcours des versets reçus du serveur
            for (const serverVerse of data.verses) {
                const localVerse = localMap.get(serverVerse.local_id);

                // Si le verset n’existe pas en local => c’est un nouveau
                if (!localVerse) {
                    // on formatte le verset avant insertion
                    const {_id, local_id, __v, updatedAt, ...rest} = serverVerse;
                    newVersesToAdd.push({
                        id: local_id,
                        ...rest,
                    });
                } else {
                    // 4. S’il existe déjà : comparer updatedAt (serveur) et createdAt (local)
                    const serverUpdatedAt = new Date(serverVerse.updatedAt).getTime();
                    const localCreatedAt = new Date(localVerse.createdAt).getTime();

                    // Si serverUpdatedAt > localCreatedAt, alors on remplace la version locale
                    if (serverUpdatedAt > localCreatedAt) {
                        // On se prépare à le supprimer, puis à le réinsérer
                        if (localVerse) {
                            if (localVerse.id != null) {
                                versesToDelete.push(localVerse.id);
                            }
                        }

                        const {_id, local_id, __v, updatedAt, ...rest} = serverVerse;
                        versesToReplace.push({
                            id: local_id,
                            ...rest,
                        });
                    }
                }
            }

            // 5. Suppression en lot des versets qui doivent être remplacés
            if (versesToDelete.length > 0) {
                await db.verses.bulkDelete(versesToDelete);
            }

            // 6. Ajout en bloc des versets mis à jour ou nouveaux
            if (versesToReplace.length > 0) {
                await db.verses.bulkAdd(versesToReplace);
            }
            if (newVersesToAdd.length > 0) {
                await db.verses.bulkAdd(newVersesToAdd);
            }

            // 7. **Supprimer localement les versets qui ne sont pas sur le serveur**
            //    => ceux dont l'ID local n'apparaît pas dans `data.verses`
            const serverLocalIds = new Set(data.verses.map((v) => v.local_id));

            // On récupère tous les ID qui ne sont pas présents dans la réponse du serveur
            const versesToRemoveBecauseMissingOnServer = localVerses
                .filter((lv) => !serverLocalIds.has(lv.id))
                .map((lv) => lv.id);

            if (versesToRemoveBecauseMissingOnServer.length > 0) {
                await db.verses.bulkDelete(versesToRemoveBecauseMissingOnServer);
            }

            console.log("Verses from server:", data.verses);
            return data;
        } catch (error) {
            // Gérer les erreurs de réseau, etc.
            console.error("Erreur lors de la synchronisation :", error);
            throw error;
        }
    }

}

interface LVerset extends Verset {
    local_id: number;
    __v: number;
    updatedAt: string;
    _id: string;
}