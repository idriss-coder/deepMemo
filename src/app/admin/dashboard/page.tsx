"use client";
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {DashboardHeader} from "./_components/DashboardHeader";
import {CreateCategoryForm} from "./_components/CreateCategoryForm";
import {CategoryCard} from "./_components/CategoryCard";
import {EmptyState} from "./_components/EmptyState";
import {StatsSection} from "./_components/StatsSection";
import {useCategories} from "./_hooks/useCategories";
import {Category} from "./_types";

export default function AdminDashboard() {
    const {
        categories,
        loading,
        error,
        createCategory,
        updateCategory,
        toggleActive,
        deleteCategory,
        createVersetAndAddToCategory,
        removeVersetFromCategory,
        isCreating
    } = useCategories({includeDisabled: true});

    const handleCreateCategory = async (name: string) => {
        try {
            await createCategory(name);
        } catch (error) {
            console.error("Erreur lors de la création de la catégorie:", error);
        }
    };

    const handleUpdateCategory = async (id: string, name: string) => {
        try {
            await updateCategory({id, name});
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la catégorie:", error);
        }
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        try {
            await toggleActive({id, isActive});
        } catch (error) {
            console.error("Erreur lors du changement d'état de la catégorie:", error);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id);
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie:", error);
        }
    };

    const handleAddVerset = async (categoryId: string, versetData: {
        book_num: number;
        chapter_num: number;
        verses_num: number[];
        content: string;
    }) => {
        try {
            await createVersetAndAddToCategory({categoryId, versetData});
        } catch (error) {
            console.error("Erreur lors de l'ajout du verset:", error);
        }
    };

    const handleRemoveVerset = async (categoryId: string, versetId: string) => {
        try {
            await removeVersetFromCategory({categoryId, versetId});
        } catch (error) {
            console.error("Erreur lors de la suppression du verset:", error);
        }
    };

    return (
        <div className="min-h-screen bg-bgPrimary text-white pb-32 mb-[150px]">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <Tabs defaultValue="categories" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 bg-bgPrimarySecondary/30 border border-bgPrimarySecondary/50">
                        <TabsTrigger 
                            value="categories" 
                            className="data-[state=active]:bg-lPrimary data-[state=active]:text-bgPrimary font-['Feather'] font-bold"
                        >
                            Catégories
                        </TabsTrigger>
                        <TabsTrigger 
                            value="stats" 
                            className="data-[state=active]:bg-lPrimary data-[state=active]:text-bgPrimary font-['Feather'] font-bold"
                        >
                            Statistiques
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="categories" className="space-y-6">
                        <CreateCategoryForm
                            onSubmit={handleCreateCategory}
                            loading={isCreating}
                            error={error}
                        />

                        <div className="space-y-4">
                            {categories.reverse().map((category: Category) => (
                                <CategoryCard
                                    key={category._id}
                                    category={category}
                                    onUpdate={handleUpdateCategory}
                                    onDelete={handleDeleteCategory}
                                    onToggleActive={handleToggleActive}
                                    onAddVerset={handleAddVerset}
                                    onRemoveVerset={handleRemoveVerset}
                                />
                            ))}
                        </div>

                        {categories.length === 0 && !loading && <EmptyState />}
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-6">
                        <StatsSection categories={categories} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
} 