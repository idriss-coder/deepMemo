import {BackButton} from "@/components/customize/utils";
import {Input} from "@/components/ui/input";
import {DArrowGoIcon, DHeartGray} from "@/components/customize/icons";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function AddVersetPage() {

    return (
        <div className={"px-[20px] flex flex-col gap-[28px]"}>
            <BackButton isClose={true} link={"/plaground/home/verses-list"} mainTitle={"Nouveau verset"}/>
            <SearchSection/>
        </div>
    )
}

const SearchSection = () => {

    return (
        <div className={"flex flex-col gap-[28px]"}>
            <Input placeholder={"Nom du livre"}/>
            <SearchSuggestion/>
        </div>
    )
}

const SearchSuggestion = () => {

    return (
        <div className={"flex flex-col gap-[16px]"}>
            <div className="text-white text-xl font-bold font-['Feather']">Suggestion de livre</div>
            <SuggestionList/>
        </div>
    )
}

const SuggestionList = () => {
    return (
        <div className={"flex flex-col gap-[18px]"}>
            <SuggestionItem/>
            <SuggestionItem/>
            <SuggestionItem/>
            <SuggestionItem/>
        </div>
    )
}

const SuggestionItem = () => {

    return (
        <div className={"flex items-center justify-between"}>
            <div className={"flex gap-[8px] items-center"}>
                <DHeartGray className={"text-sm"} width={46} height={42}/>
                <div className={"flex flex-col gap-[4px]"}>
                    <div className="text-white text-base font-bold font-['Feather']">Genese</div>
                    <div className="text-[#4e5b64] text-sm font-normal">50 chap.</div>
                </div>
            </div>
            <Link href={"/plaground/home/verses-list/new/infos"}>
                <Button size={"sm"}>
                    <DArrowGoIcon className={"scale-150"}/>
                </Button>
            </Link>
        </div>
    )
}