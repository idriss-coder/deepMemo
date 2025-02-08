"use client"

import {Slider} from "@/components/ui/slider";

export const SoundThemRegulator = () => {

    const sound = localStorage.getItem("soundTheme")

    return (
        <Slider
            defaultValue={[sound ? +(sound) : 0.2]}
            max={1} step={0.1}
            onValueChange={(v) => {
                localStorage.setItem("soundTheme", JSON.stringify(v[0]))
            }}
        />
    )
}