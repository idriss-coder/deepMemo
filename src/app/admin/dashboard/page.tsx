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
        deleteCategory,
        createVersetAndAddToCategory,
        removeVersetFromCategory
    } = useCategories();

    const handleCreateCategory = async (name: string) => {
        await createCategory(name);
    };

    const handleUpdateCategory = async (id: string, name: string) => {
        await updateCategory(id, name);
    };

    const handleDeleteCategory = async (id: string) => {
        await deleteCategory(id);
    };

    const handleAddVerset = async (categoryId: string, versetData: {
        book_num: number;
        chapter_num: number;
        verses_num: number[];
        content: string;
    }) => {
        await createVersetAndAddToCategory(categoryId, versetData);
    };

    const handleRemoveVerset = async (categoryId: string, versetId: string) => {
        await removeVersetFromCategory(categoryId, versetId);
    };

    return (
        <div className="min-h-screen bg-bgPrimary text-white">
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
                            loading={loading}
                            error={error}
                        />

                        <div className="space-y-4">
                            {categories.map((category: Category) => (
                                <CategoryCard
                                    key={category._id}
                                    category={category}
                                    onUpdate={handleUpdateCategory}
                                    onDelete={handleDeleteCategory}
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