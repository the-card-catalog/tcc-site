import { Button } from "./ui/button";
export const LinkButton = ({ href, title }: { href: string, title: string }) => (
    <Button render={<a href={href}>{title}</a>} className="p-6 text-lg rounded-2xl no-underline" />
)