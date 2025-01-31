import {DBook} from "@/components/customize/icons";
import {cn} from "@/lib/utils";

export default function HomPage() {

    return (
        <div>
            <TrainingUser/>
            <div className={"px-[20px] py-[34px]"}>
                <div className={"flex flex-col gap-[15px]"}>
                    <div>
                        <h1 className="text-white text-xl font-bold font-['Feather']">Entrainements</h1>
                    </div>

                    <div>
                        <TrainingItem/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TrainingItem = () => {
    return (
        <button
            className={cn(
                "w-full h-[79px] pl-[30px] bg-[#141f25] rounded-[15px] border-l-2 border-r-2 border-t-2 border-b-4 border-[#38454e] justify-between items-center inline-flex overflow-hidden",
                "hover:border-b-[5px]",
                "active:border-b-2",
                "transition",
                "transition"
            )}
        >
            <div className="text-white/90 text-base font-bold font-['Feather']">Versets bibliques</div>
            <DBook/>
        </button>
    )
}

const TrainingUser = () => {

    return (
        <div
            className={"w-full h-[336px] relative bg-gradient-to-b from-[#5f3a9a] to-[#1a143a] overflow-hidden flex items-center justify-center"}>
            <UerAvatarWrap/>
        </div>
    )
}

const UerAvatarWrap = () => {

    return (
        <div className={"size-[115px] bg-[#ffab33] rounded-full flex items-center justify-center"}>
            <div className="w-[35px] h-[43px] text-[#0c1216] text-4xl font-bold font-['Feather']">IL</div>
        </div>
    )
}