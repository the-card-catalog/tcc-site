import { Badge } from "./ui/badge";

export function ArticleTags({ tags }: { tags: Array<string> }) {
    return (
        <div className="flex gap-4">
            {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
            ))}
        </div>
    )
}
