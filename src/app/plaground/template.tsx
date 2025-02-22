"use client"

import React, {useEffect} from "react";
import VersetService from "@/service/VersetServie";
import UserService from "@/service/UserService";
import {isOnline} from "@/lib/utils";
import {useFetchRemoteVerses} from "@/hooks/useVerses";


const versetService = new VersetService()
const userService = new UserService()


const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const {loading, handlerFetch} = useFetchRemoteVerses()

    useEffect(() => {
        function handleOnline() {
            console.log("Le navigateur est en ligne, on tente de synchroniser...");
            void versetService.syncWithServer();
            void handlerFetch()
        }

        if (isOnline()) {
            void handlerFetch()
            void userService.requestProfile()
        }

        const timer = setTimeout(async () => {
            await versetService.syncWithServer();
            clearTimeout(timer);
        }, 5000)

        window.addEventListener('online', handleOnline);
        return () => {
            clearTimeout(timer)
            window.removeEventListener('online', handleOnline);
        };
    }, [])


    return (
        <div>
            {children}
        </div>
    )
}


export default Template
