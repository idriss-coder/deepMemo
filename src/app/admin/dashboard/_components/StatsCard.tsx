"use client";
import React from "react";
import {StatsCardProps} from "../_types";
import {motion} from "framer-motion";

export const StatsCard: React.FC<StatsCardProps> = ({
                                                        title,
                                                        value,
                                                        icon,
                                                        color,
                                                        bgColor
                                                    }) => {
    return (
        <motion.div
            className="bg-bgPrimarySecondary/10 border border-bgPrimarySecondary/30 rounded-2xl p-6 backdrop-blur-sm hover:border-lPrimary/30 hover:bg-bgPrimarySecondary/20 transition-all duration-300"
            initial={{opacity: 0, y: 0}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
            // whileHover={{y: -5}}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-['Feather'] mb-2">{title}</p>
                    <p className={`text-4xl font-bold font-['Feather'] ${color} group-hover:scale-105 transition-transform duration-200`}>
                        {value.toLocaleString()}
                    </p>
                </div>
                <div
                    className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>

            {/* Gradient accent */}
            <div
                className={`h-1 ${bgColor} rounded-full mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200`}/>
        </motion.div>
    );
}; 