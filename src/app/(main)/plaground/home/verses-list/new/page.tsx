"use client"

import {BackButton} from "@/components/customize/utils";
import {Input} from "@/components/ui/input";
import {DArrowGoIcon, DHeartGray} from "@/components/customize/icons";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {BibleBook, Book, topBooks} from "@/backend/mock/bible-book";
import React, {useMemo, useState} from "react";
import Fuse from "fuse.js";
import {removeAccents} from "@/lib/utils";
import {useRouter} from "next/navigation";

export default function AddVersetPage() {

    return (
        <div className={"px-[20px] flex flex-col gap-[28px] pb-8"}>
            <BackButton isClose={true} link={"/plaground/home/verses-list"} mainTitle={"Nouveau verset"}/>
            <SearchSection/>
        </div>
    )
}

const SearchSection = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const fuse = useMemo(() => {
        const options = {
            keys: [
                "labelNormalized",
            ],
            threshold: 0.4,
        };

        const BibleBookNormalized = BibleBook.map(book => ({
            ...book,
            labelNormalized: removeAccents(book.label),
        }));

        return new Fuse(BibleBookNormalized, options);
    }, []);

    const searchResult = useMemo(() => {
        const trimmed = searchTerm.trim().toLowerCase()
        const queryNormalized = removeAccents(trimmed)

        if (!trimmed) {
            return topBooks
        }
        const fuseResults = fuse.search(queryNormalized)

        return fuseResults.map((result) => result.item)
    }, [searchTerm, fuse])

    return (
        <div className={"flex flex-col gap-[28px]"}>
            <Input
                id={"search"}
                type={"text"}
                placeholder={"Rechercher un livre"}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />
            <SearchSuggestion books={searchResult}/>
        </div>
    )
}

const SearchSuggestion: React.FC<{ books: Book[] }> = ({books}) => {

    return (
        <div className={"flex flex-col gap-[16px]"}>
            <div className="text-white text-xl font-bold font-['Feather']">Suggestion de livre</div>
            <SuggestionList books={books}/>
        </div>
    )
}

const SuggestionList: React.FC<{ books: Book[] }> = ({books}) => {
    return (
        <div className={"flex flex-col gap-[18px]"}>
            {books.map(b => (
                <SuggestionItem book={b} key={b.id}/>
            ))}
        </div>
    )
}

const SuggestionItem: React.FC<{ book: Book }> = ({book}) => {

    const $router = useRouter();
    const uri = `/plaground/home/verses-list/new/infos?book_id=${book.id}`

    return (
        <div
            className={"flex items-center justify-between"}
            onClick={() => {
                $router.push(uri)
            }}
        >
            <div className={"flex gap-[8px] items-center"}>
                <DHeartGray className={"text-sm"} width={46} height={42}/>
                <div className={"flex flex-col gap-[4px]"}>
                    <div className="text-white text-base font-bold font-['Feather']">{book.label}</div>
                    <div className="text-[#4e5b64] text-sm font-normal">{book.chapters} chap.</div>
                </div>
            </div>
            <Link href={uri}>
                <Button size={"sm"}>
                    <DArrowGoIcon className={"scale-150"}/>
                </Button>
            </Link>
        </div>
    )
}