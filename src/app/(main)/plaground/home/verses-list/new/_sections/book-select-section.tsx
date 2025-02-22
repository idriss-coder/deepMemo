import React, {useMemo} from "react";
import {BibleBook, Book, topBooks} from "@/backend/mock/bible-book";
import {removeAccents} from "@/lib/utils";
import Fuse from "fuse.js";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {DArrowGoIcon, DHeartGray} from "@/components/customize/icons";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const BookSelectSection: React.FC<{
    cb?: BookCallBack,
    searchValue?: string,
    setSearchValue?: (value: string) => string
}> = ({cb, searchValue}
) => {


    const fuse = useMemo(() => {
        const options = {
            keys: [
                "labelNormalized",
            ],
            threshold: 0.4,
        };

        const BibleBookNormalized = BibleBook.map(book => ({
            ...book,
            labelNormalized: removeAccents(book.label).replace(/\s+/g, ""),
        }));

        return new Fuse(BibleBookNormalized, options);
    }, []);

    const searchResult = useMemo(() => {
        if (!searchValue) return topBooks

        const trimmed = searchValue.trim().toLowerCase()
        const queryNormalized = removeAccents(trimmed).replace(/\s+/g, "")

        if (!trimmed) {
            return topBooks
        }
        const fuseResults = fuse.search(queryNormalized)

        return fuseResults.map((result) => result.item)
    }, [searchValue, fuse])

    return (
        <div className={"flex flex-col gap-[28px]"}>
            <SearchSuggestion
                books={searchResult}
                cb={cb}
            />
        </div>
    )
}

export const SearchBookComponent: React.FC<{ tem: string | undefined, setTem: (v: string) => void }> = ({
                                                                                                            tem,
                                                                                                            setTem
                                                                                                        }) => {
    return (
        <Input
            id={"search"}
            type={"text"}
            placeholder={"Rechercher un livre"}
            onChange={(e) => setTem(e.target.value)}
            value={tem}
        />
    )
}

const SearchSuggestion: React.FC<{ books: Book[], cb?: BookCallBack }> = ({books, cb}) => {

    return (
        <div className={"flex flex-col gap-[16px]"}>
            {!cb && <div className="text-white text-xl font-bold font-['Feather']">Suggestion de livre</div>}
            <SuggestionList
                books={books}
                cb={cb}
            />
        </div>
    )
}

const SuggestionList: React.FC<{ books: Book[], cb?: BookCallBack }> = ({books, cb}) => {
    return (
        <div className={"flex flex-col gap-[18px] pb-24"}>
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
    const [load, setLod] = React.useState(false)

    const onNavigate = () => {
        if (cb) {
            cb(book.id)
            return
        }
        setLod(true)
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
            {cb ? <Button
                withSound={!!cb}
                soundMode={2}
                size={"sm"}
                onClick={onNavigate}
            >
                <DArrowGoIcon className={"scale-150"}/>
            </Button> : (
                <Link
                    onClick={() => setLod(true)}
                    href={uri}
                >
                    <Button
                        withSound={!!cb}
                        soundMode={2}
                        size={"sm"}
                        onClick={onNavigate}
                    >
                        {load ? "..." : <DArrowGoIcon className={"scale-150"}/>}
                    </Button>
                </Link>
            )}
        </div>
    )
}

type BookCallBack = (book_id: number) => void