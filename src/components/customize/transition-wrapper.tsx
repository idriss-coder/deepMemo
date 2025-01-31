"use client"

import {AnimatePresence, motion} from "framer-motion";
import {usePathname} from "next/navigation";
import React from "react";

export const TransitionWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{opacity: 1, x: 20}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -20}}
                transition={{duration: 0.2}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

