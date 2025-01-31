import React from "react";
import {DHearIcon} from "@/components/customize/icons";


const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <div className={"container py-[40px] px-[10px] relative h-screen overflow-hidden"}>
            <div className={"z-10"}>
                {children}
            </div>
            <DHearIcon className={"absolute top-[310px] right-0 opacity-45 -z-20"}/>
        </div>
    )
}


export default Template
