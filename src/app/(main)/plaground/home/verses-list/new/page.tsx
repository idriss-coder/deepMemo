"use client"

import {BackButton} from "@/components/customize/utils";
import React from "react";
import {BookSelectSection} from "@/app/(main)/plaground/home/verses-list/new/_sections/book-select-section";

export default function AddVersetPage() {

    return (
        <div className={"px-[20px] flex flex-col gap-[28px] pb-8"}>
            <BackButton isClose={true} link={"/plaground/home/verses-list"} mainTitle={"Nouveau verset"}/>
            <BookSelectSection/>
        </div>
    )
}
