import React from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

export const CloseConfirm: React.FC<{
    state: "closed" | "opened",
    onCloseCancel: () => void,
    title: string,
    icon: React.ReactNode
    subTitle: string,
    cancelText: string
    performText?: string
    performAction: () => void
}> = ({
          state,
          onCloseCancel,
          title,
          icon,
          subTitle,
          cancelText,
          performText,
          performAction
      }) => {

    const isOpened = state === "opened"

    return (
        <TransitionScreen className={cn(
            "bg-black/80",
            isOpened ? "h-screen" : "h-0 overflow-hidden"
        )}>

            <div className={cn(
                "w-full h-fit p-5 pb-10 py-[30px] flex flex-col justify-between bg-[#141f25] rounded-t-lg overflow-hidden",
                isOpened ? "h-fit" : "h-[0%]"
            )}>
                <div className={"flex flex-col items-center gap-[20px]"}>
                    {icon}
                    <div className={"flex flex-col gap-[29px]"}>
                        <div className={"flex flex-col gap-[17px]"}>
                            <div className="text-white text-xl font-bold font-['Feather'] text-center">
                                {title}
                            </div>
                            <div className="text-center text-[#4e5b64] text-sm font-normal leading-snug">
                                {subTitle}
                            </div>
                        </div>

                        <div className={"flex flex-col gap-[20px]"}>
                            <Button
                                variant={"green"}
                                className="w-full"
                                onClick={onCloseCancel}
                            >
                                {cancelText}
                            </Button>
                            <Button
                                variant={"textRed"}
                                className="w-full"
                                onClick={performAction}
                            >
                                {performText}
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </TransitionScreen>
    )
}

export const TransitionScreen: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className}) => {
    return (
        <div
            className={cn("h-screen w-full fixed top-0 left-0 flex justify-between items-end", className)}>
            {children}
        </div>
    )
}