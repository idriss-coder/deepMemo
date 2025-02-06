import React, {Suspense} from "react";

const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <Suspense>
            <div>
                {children}
            </div>
        </Suspense>
    )
}


export default Template
