"use client";
import React from "react";
import {StatsCard} from "./StatsCard";
import {StatsSectionProps} from "../_types";
import {BarChart3, TrendingUp} from "lucide-react";
import {motion} from "framer-motion";

export const StatsSection: React.FC<StatsSectionProps> = ({categories}) => {
    const totalVersets = categories.reduce((acc, cat) => acc + (cat.versets?.length || 0), 0);
    const averageVersets = categories.length > 0 
        ? Math.round(totalVersets / categories.length)
        : 0;

    const stats = [
        {
            title: "Total Catégories",
            value: categories.length,
            icon: "📁",
            color: "text-lPrimary",
            bgColor: "bg-lPrimary/20"
        },
        {
            title: "Total Versets",
            value: totalVersets,
            icon: "📖",
            color: "text-[#92d233]",
            bgColor: "bg-[#92d233]/20"
        },
        {
            title: "Moyenne par catégorie",
            value: averageVersets,
            icon: "📊",
            color: "text-lRed",
            bgColor: "bg-lRed/20"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div 
                className="flex items-center gap-3"
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lPrimary/20 to-lPrimary/10 border border-lPrimary/30 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-lPrimary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold font-['Feather'] text-white">
                        Statistiques
                    </h2>
                    <p className="text-sm text-muted-foreground font-['Feather']">
                        Vue d'ensemble de votre bibliothèque
                    </p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: index * 0.1}}
                    >
                        <StatsCard {...stat} />
                    </motion.div>
                ))}
            </div>

            {/* Additional Insights */}
            {categories.length > 0 && (
                <motion.div 
                    className="bg-bgPrimarySecondary/10 border border-bgPrimarySecondary/30 rounded-2xl p-6 backdrop-blur-sm"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.3}}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#92d233]/20 to-[#92d233]/10 border border-[#92d233]/30 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-[#92d233]" />
                        </div>
                        <h3 className="text-lg font-bold font-['Feather'] text-white">
                            Insights
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-['Feather']">
                        <div className="flex items-center justify-between p-3 bg-bgPrimarySecondary/20 rounded-xl">
                            <span className="text-muted-foreground">Catégorie la plus active</span>
                            <span className="text-white font-medium">
                                {categories.reduce((max, cat) => 
                                    (cat.versets?.length || 0) > (max.versets?.length || 0) ? cat : max
                                ).name}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-bgPrimarySecondary/20 rounded-xl">
                            <span className="text-muted-foreground">Taux de remplissage</span>
                            <span className="text-white font-medium">
                                {Math.round((categories.filter(cat => (cat.versets?.length || 0) > 0).length / categories.length) * 100)}%
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}; 