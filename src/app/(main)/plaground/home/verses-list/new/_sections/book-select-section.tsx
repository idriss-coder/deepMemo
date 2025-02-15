import React, {useMemo, useState} from "react";
import {BibleBook, Book, topBooks} from "@/backend/mock/bible-book";
import {removeAccents} from "@/lib/utils";
import Fuse from "fuse.js";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {DArrowGoIcon, DHeartGray} from "@/components/customize/icons";
import {Button} from "@/components/ui/button";

export const BookSelectSection: React.FC<{ cb?: BookCallBack }> = ({cb}) => {

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
            <SearchSuggestion
                books={searchResult}
                cb={cb}
            />
        </div>
    )
}

const SearchSuggestion: React.FC<{ books: Book[], cb?: BookCallBack }> = ({books, cb}) => {

    return (
        <div className={"flex flex-col gap-[16px]"}>
            <div className="text-white text-xl font-bold font-['Feather']">Suggestion de livre</div>
            <SuggestionList
                books={books}
                cb={cb}
            />
        </div>
    )
}

const SuggestionList: React.FC<{ books: Book[], cb?: BookCallBack }> = ({books, cb}) => {
    return (
        <div className={"flex flex-col gap-[18px]"}>
            {books.map(b => (
                <SuggestionItem
                    book={b}
                    key={b.id}
                    cb={cb}
                />
            ))}
        </div>
    )
}

const SuggestionItem: React.FC<{ book: Book, cb?: BookCallBack }> = ({book, cb}) => {

    const $router = useRouter();
    const uri = `/plaground/home/verses-list/new/infos?book_id=${book.id}`

    const onNavigate = () => {
        if (cb) {
            cb(book.id)
            return
        }
        $router.push(uri)
    }

    return (
        <div
            className={"flex items-center justify-between"}
            onClick={onNavigate}
        >
            <div
                className={"flex gap-[8px] items-center"}
            >
                <DHeartGray className={"text-sm"} width={46} height={42}/>
                <div className={"flex flex-col gap-[4px]"}>
                    <div className="text-white text-base font-bold font-['Feather']">{book.label}</div>
                    <div className="text-[#4e5b64] text-sm font-normal">{book.chapters} chap.</div>
                </div>
            </div>
            <Button
                size={"sm"}
                onClick={onNavigate}
            >
                <DArrowGoIcon className={"scale-150"}/>
            </Button>
        </div>
    )
}

type BookCallBack = (book_id: number) => void