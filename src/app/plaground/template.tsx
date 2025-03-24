"use client"

import React, {useEffect} from "react";
import VersetService from "@/service/VersetServie";
import UserService from "@/service/UserService";
import {isOnline} from "@/lib/utils";
import {useFetchRemoteVerses} from "@/hooks/useVerses";
import {usePathname} from "next/navigation";


const versetService = new VersetService()
const userService = new UserService()


const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const {loading, handlerFetch} = useFetchRemoteVerses()
    const $path = usePathname()

    useEffect(() => {
        async function handleOnline() {
            console.log("Le navigateur est en ligne, on tente de synchroniser...");
            await versetService.syncWithServer();
            void handlerFetch()
        }

        if (isOnline()) {
            const pathsToStartSync = ["/plaground/home", "/plaground/home/verses-list"]

            // if (!pathsToStartSync.includes($path)) {
            //     return
            // }

            void userService.requestProfile()
            void handleOnline()
        }

        // const timer = setTimeout(async () => {
        //     void handleOnline()
        //     clearTimeout(timer);
        // }, 2000)

        window.addEventListener('online', handleOnline);
        return () => {
            // clearTimeout(timer)
            window.removeEventListener('online', handleOnline);
        }
    }, [])


    return (
        <div>
            {children}
        </div>
    )
}


export default Template
