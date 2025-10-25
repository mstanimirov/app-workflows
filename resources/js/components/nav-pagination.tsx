import * as React from "react";
import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"; // swap for your own if you prefer
import { PaginationPayload } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { router } from "@inertiajs/react";

type WayfinderRoute = { url: (opts?: { query?: Record<string, any>; mergeQuery?: Record<string, any> }) => string };

type Slot = number | 'ellipsis'

type Props<T> = {
    payload: PaginationPayload<T>
    index: WayfinderRoute
    size?: 'sm' | 'default' | 'lg'
};

export function NavPagination<T>({
    payload,
    index,
    size = "sm"
}: Props<T>) {

    const { current_page, last_page } = payload

    function buildSlots(current: number, last: number): Slot[] {
        if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1)
        if (current <= 4) return [1, 2, 3, 4, 5, 'ellipsis', last]
        if (current >= last - 3) return [1, 'ellipsis', last - 4, last - 3, last - 2, last - 1, last]
        return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', last]
    }

    const slots = buildSlots(current_page, last_page)
    const prevDisabled = current_page <= 1
    const nextDisabled = current_page >= last_page

    function go(pageIndex: number) {
        router.get(index.url(), {page: pageIndex}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        })
    }

    return (
        <div className="flex items-center gap-1">
            <Button size={size} variant="ghost" onClick={() => { }} disabled={prevDisabled} aria-label="Previous page">
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {slots.map((s, i) =>
                s === 'ellipsis' ? (
                    <Button key={`e-${i}`} size={size} variant="ghost" disabled className="px-2">…</Button>
                ) : (
                    <Button key={`p-${s}`} size={size} variant={s === current_page ? 'outline' : 'ghost'} onClick={() => go(s)} aria-current={s === current_page ? 'page' : undefined}>
                        {s}
                    </Button>
                )
            )}

            <Button size={size} variant="ghost" onClick={() => { }} disabled={nextDisabled} aria-label="Next page">
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div >
    );
}
