import { ATLTags } from "./Tags";
import { Card, CardContent, CardHeader } from "./ui/card";

interface Article {
    id: string
    data: ArticleData
}
interface ArticleData {
    title: string,
    description: string,
    tags: Array<string>
}

export function ATLGallery({ articles }: { articles: Array<Article> }) {
    return (<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
            <a className='block no-underline text-inherit h-full' href={`/ask-the-librarian/${article.id}`} key={article.id}>
                <Card className='hover:bg-muted/85 h-full'>
                    <CardHeader><span className='text-[1.1rem]'>{article.data.title}</span></CardHeader>
                    <CardContent><ATLTags tags={article.data.tags} /><p className='p-2'><em>{article.data.description}</em></p></CardContent>
                </Card>
            </a>

        ))}
    </div>)
}