import { TextAlignJustify, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export interface HamburgerMenuProps {
    links: { label: string; href: string }[];
}

export default function HamburgerMenu({ links }: HamburgerMenuProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    return (
        <div ref={wrapperRef} className="relative inline-block">
            <Button
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-label="Toggle menu"
                variant={"link"}
                size={"lg"}
                className={"text-white no-underline! text-md cursor-pointer"}
            >
                {open ? <X /> : <TextAlignJustify />}
            </Button>

            {open && (
                <div className="absolute right-0 top-full w-60 z-100 bg-muted rounded-lg shadow-md p-4 text-sm max-w-[calc(100vw-2rem)]">
                    <ul>
                        {links.map((link) => (
                            <li key={link.href} className="p-1">
                                <a href={link.href} onClick={() => setOpen(false)}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}