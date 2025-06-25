"use client"

import React, {Suspense, useEffect} from "react";
import {isOnline} from "@/lib/utils";


const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {

    useEffect(() => {
        async function handleOnline() {
            console.log("Le navigateur est en ligne, on tente de synchroniser...");
        }

        if (isOnline()) {

            // if (!pathsToStartSync.includes($path)) {
            //     return
            // }

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
            <Suspense fallback={"Loading..."}>
                {children}
            </Suspense>
        </div>
    )
}


export default Template
