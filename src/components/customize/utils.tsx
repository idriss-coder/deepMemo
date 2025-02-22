"use client"

import {ArrowLeftIcon} from "lucide-react";
import React from "react";
import {useRouter} from "next/navigation";
import {DCloseIcon} from "@/components/customize/icons";
import {stopAllSounds} from "@/lib/utils";

export const BackButton: React.FC<{
    mainTitle?: React.ReactNode,
    isClose?: boolean, link?: string,
    forwardClose?: boolean
}> = ({
          forwardClose,
          mainTitle,
          isClose,
          link
      }) => {


    const $router = useRouter()
    return (
        <div className={"flex items-center justify-between w-full pt-4"}>
            <button
                onClick={() => {
                    if (forwardClose) {
                        const timer = setTimeout(() => {
                            stopAllSounds()
                            clearTimeout(timer)
                        }, 1000 * 2)
                    }
                    if (link) $router.replace(link)
                    else $router.back()
                }}
                className={"text-white/65"}
            >
                {isClose ? (
                        <DCloseIcon/>
                    )
                    : (
                        <ArrowLeftIcon/>
                    )
                }
            </button>
            <div className="text-white/20 text-base font-bold font-['Feather']">{mainTitle}</div>
            <div></div>
        </div>
    )
}

export const letterColors: Record<string, string> = {
    A: "#E63946",
    B: "#F3722C",
    C: "#F9C74F",
    D: "#90BE6D",
    E: "#43AA8B",
    F: "#4D908E",
    G: "#577590",
    H: "#277DA1",
    I: "#FFC300",
    J: "#C70039",
    K: "#900C3F",
    L: "#581845",
    M: "#00A8E8",
    N: "#007EA7",
    O: "#003459",
    P: "#00A878",
    Q: "#F2542D",
    R: "#242423",
    S: "#463F3A",
    T: "#8A817C",
    U: "#A3CCAB",
    V: "#EDC7B7",
    W: "#7FDBFF",
    X: "#39CCCC",
    Y: "#001F3F",
    Z: "#666666",
};

export function getBgColorFromLetter(value?: string) {
    const firstLetter = value?.charAt(0) ?? "";
    // On vérifie que c’est une lettre entre A et Z
    const key = firstLetter.toUpperCase();
    if (letterColors[key]) {
        return letterColors[key];
    }
    // Couleur par défaut si la lettre n’est pas gérée
    return "#ffab33";
}