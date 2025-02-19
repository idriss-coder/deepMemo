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
