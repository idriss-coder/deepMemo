"use client"

import React from "react";
import {DHearIcon} from "@/components/customize/icons";
import {AuthManagerGuard} from "@/service/AuthManager";
import {useRouter} from "next/navigation";


const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const $router = useRouter();

    React.useEffect(() => {
        if (AuthManagerGuard.isLoggedIn()) {
            $router.replace("/plaground/home")
        }
    }, [$router])

    return (
        <div className={"py-[40px] px-[10px] relative h-screen overflow-hidden"}>
            <div className={"z-10 max-w-xl mx-auto w-full"}>
                {children}
            </div>
            <DHearIcon className={"absolute top-[310px] right-0 opacity-45 -z-20"}/>
        </div>
    )
}


export default Template
