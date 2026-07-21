import { Badge } from "./ui/badge";

export function ArticleTags({ tags }: { tags: Array<string> }) {
    return (
        <div className="flex gap-2">
            {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
            ))}
        </div>
    )
}
