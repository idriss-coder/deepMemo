"use client";
import React from "react";
import {BookOpen, Plus} from "lucide-react";
import {motion} from "framer-motion";

export const EmptyState: React.FC = () => {
    return (
        <motion.div 
            className="text-center py-16"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-lPrimary/20 to-lPrimary/10 border border-lPrimary/30 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-lPrimary" />
            </div>
            
            <h3 className="text-2xl font-['Feather'] font-bold text-white mb-3">
                Aucune catégorie
            </h3>
            
            <p className="text-muted-foreground font-['Feather'] text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Commencez par créer votre première catégorie pour organiser vos versets bibliques
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-['Feather']">
                <Plus className="w-4 h-4" />
                <span>Utilisez le formulaire ci-dessus pour créer une catégorie</span>
            </div>
        </motion.div>
    );
}; 