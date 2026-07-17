import { Nav } from "./Nav";

export function ArticleWrapper({ children }: React.PropsWithChildren) {
    return (<>
        <Nav />
        <img src="/banner.avif" className="object-cover" height={350} width="auto" alt="An old card catalog" />
        <div className="m-auto width-[90%] md:w-[80%] lg:w-[75%] typeset typeset-article bg-muted p-8">{children}</div>
    </>)
}