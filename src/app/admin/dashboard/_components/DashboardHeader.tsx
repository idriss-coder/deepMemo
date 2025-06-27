"use client";
import React from "react";
import {Shield, Settings, Activity} from "lucide-react";
import {motion} from "framer-motion";

export const DashboardHeader: React.FC = () => {
    return (
        <motion.div 
            className="border-b border-bgPrimarySecondary/30 bg-bgPrimarySecondary/10 backdrop-blur-xl"
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lPrimary/20 to-lPrimary/10 border border-lPrimary/30 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-lPrimary" />
                        </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold font-['Feather'] text-white">
                                DeepMemo Builder
                            </h1>
                            <p className="text-muted-foreground font-['Feather'] mt-1 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Gestion des catégories et versets
                            </p>
                        </div>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-bgPrimarySecondary/20 rounded-xl border border-bgPrimarySecondary/30">
                            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                            <span className="text-sm font-['Feather'] text-muted-foreground">Admin</span>
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-bgPrimarySecondary/20 border border-bgPrimarySecondary/30 flex items-center justify-center hover:bg-bgPrimarySecondary/30 transition-colors duration-200">
                            <Settings className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}; 