import {useMemo} from "react";
import {useVerses} from "@/hooks/useVerses";

const useGameplayArea = () => {

    const {myVerses} = useVerses()

    /** GameplayScenario
     *
     *
     * */
    const initQuizData = useMemo(() => {
        if (!myVerses) return
        return (
            [
                {
                    id: 1,
                    target: myVerses[0],
                    outputsOptions: myVerses
                },

                {
                    id: 2,
                    target: myVerses[1],
                    outputsOptions: myVerses
                },

                {
                    id: 3,
                    target: myVerses[2],
                    outputsOptions: myVerses
                },
            ]
        )
    }, [myVerses])


}