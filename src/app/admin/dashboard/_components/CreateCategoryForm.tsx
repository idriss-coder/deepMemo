"use client";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {CreateCategoryFormProps} from "../_types";
import {Plus, FolderPlus} from "lucide-react";
import {motion} from "framer-motion";

export const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
    onSubmit,
    loading,
    error
}) => {
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        
        await onSubmit(name.trim());
        setName("");
    };

    return (
        <motion.div 
            className="bg-bgPrimarySecondary/10 border border-bgPrimarySecondary/30 rounded-2xl p-6 backdrop-blur-sm hover:border-lPrimary/30 transition-all duration-300"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
        >
            <div className="flex items-center gap-3 mb-6">
                <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lPrimary/20 to-lPrimary/10 border border-lPrimary/30 flex items-center justify-center">
                    <FolderPlus className="w-5 h-5 text-lPrimary" />
                </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold font-['Feather'] text-white">
                        Nouvelle Catégorie
                    </h2>
                    <p className="text-sm text-muted-foreground font-['Feather']">
                        Créez une nouvelle catégorie pour organiser vos versets
                    </p>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="category-name" className="text-sm font-medium font-['Feather'] text-white">
                        Nom de la catégorie
                    </label>
                    <Input
                        id="category-name"
                        className="bg-bgPrimarySecondary/30 border-bgPrimarySecondary/50 text-white placeholder:text-muted-foreground font-['Feather'] focus:border-lPrimary/50 focus:ring-lPrimary/20"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ex: Versets d'encouragement, Psaumes favoris..."
                        required
                        disabled={loading}
                    />
                </div>
                
                <Button 
                    type="submit" 
                    disabled={loading || !name.trim()}
                    className="w-full bg-lPrimary hover:bg-lPrimary/80 text-white font-['Feather'] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Création en cours...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Créer la catégorie
                        </div>
                    )}
                </Button>
            </form>
            
            {error && (
                <motion.div 
                    className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-['Feather'] text-sm"
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.2}}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        {error}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}; 