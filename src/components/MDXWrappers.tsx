import type { ReactNode } from "react";
import React from "react";

export const ButtonWrapper = ({ children }: { children: ReactNode }) => {
    if (React.isValidElement(children) && React.Children.count(children) > 1) {

        return <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">{children}</div>
    }
    return <div className="w-full md:w-80 justify-center content-center flex m-auto py-4">{children}</div>
}