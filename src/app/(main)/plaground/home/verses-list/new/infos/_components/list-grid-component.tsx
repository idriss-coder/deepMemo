import React from "react";
import {cn, playSound} from "@/lib/utils";
import {CloseConfirm} from "@/app/(main)/plaground/home/verses-list/play/components/closeConfirm";
import {Trash2Icon} from "lucide-react";

interface ListGridProps {
    listTitle?: string
    listCount: number
    max?: number
    onSelect: (v: number[]) => void
    selectType: "unique" | "range",
    isGame?: boolean
}

export const ListGrid: React.FC<ListGridProps> = ({
                                                      listTitle,
                                                      listCount,
                                                      max = 1,
                                                      onSelect,
                                                      selectType = "unique",
                                                      isGame
                                                  }) => {
    const [actives, setActives] = React.useState<number[]>([])
    const [rangeStart, setRangeStart] = React.useState<number | null>(null)


    const handleSelection = (number: number) => {
        if (selectType === "unique") {
            if (actives.includes(number)) {
                const _currentVersets = actives.filter((n) => n !== number)
                setActives(_currentVersets)
                onSelect(_currentVersets)
            } else {
                const _currentVersets = actives.length < max ? [...actives, number] : [number]
                setActives(_currentVersets)
                onSelect(_currentVersets)
            }
        } else if (selectType === "range") {
            if (rangeStart === null) {
                setRangeStart(number)
                const _currentVersets = [number]
                setActives(_currentVersets)
                onSelect(_currentVersets)
            } else {
                const start = Math.min(rangeStart, number)
                const end = Math.max(rangeStart, number)
                const _currentVersets = Array.from({length: end - start + 1}, (_, i) => start + i)
                setActives(_currentVersets)
                onSelect(_currentVersets)
                setRangeStart(null)
            }
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {listTitle && <h2 className="text-2xl font-bold font-['Feather']">{listTitle}</h2>}
            <div className="grid grid-cols-5 gap-[10px] pb-32">
                {[...Array(listCount)].map((_, i) => {
                    const number = i + 1
                    const isActive = actives.includes(number)

                    return (
                        <button
                            onClick={() => {
                                if (isGame) playSound({path: "/assets/sound/bouton_click.mp3"})
                                handleSelection(number)
                            }}
                            key={number}
                            className={cn(
                                "aspect-square rounded-lg text-xl font-semibold flex items-center justify-center transition font-['Feather']",
                                isActive
                                    ? "bg-gradient-to-r from-[#2dabbc] to-[#42e1b1] border-b-4 border-[#1a143a]/20 text-gray-900"
                                    : "bg-bgPrimarySecondary hover:bg-bgPrimarySecondary/85",
                            )}
                        >
                            {number}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export const DeleteVersetConfirmScreen: React.FC<{
    state: "closed" | "opened",
    onCloseCancel: () => void,
    onDeleteConfirm: () => void
}> = ({
          state,
          onCloseCancel,
          onDeleteConfirm
      }) => {


    return (
        <CloseConfirm
            state={state}
            onCloseCancel={onCloseCancel}
            icon={<Trash2Icon height={70} width={70}/>}
            title={"Tu veux vraiment supprimer ce verset ?"}
            subTitle={` Apres la supression tu ne pouras plus faire marche arriere.`}
            cancelText={"Non, ne pas suprimer"}
            performText={"Supprimer"}
            performAction={() => {
                onDeleteConfirm()
            }}
        />
    )
}
