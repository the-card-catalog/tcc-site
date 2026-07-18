import { Nav } from "./Nav";

export function Wrapper({ children }: React.PropsWithChildren) {
    return (<>
        <Nav />
        <div className="w-full sm:h-75 h-60 overflow-hidden">
            <img src="/banner.avif" className="object-cover w-full h-full" alt="An old card catalog" />
        </div>
        <div className="m-auto width-[90%] md:w-[80%] lg:w-[75%] typeset typeset-article bg-muted p-8">{children}</div>
    </>)
}