import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export type CrudMode = "create" | "edit";

export type CrudSheetController = {
    open: (mode: CrudMode, payload?: unknown) => void;
    close: () => void;
    isOpen: boolean;
    mode: CrudMode;
    payload?: unknown;
};

export function useCrudSheetController(initialMode: CrudMode = "create"): CrudSheetController {
    const [isOpen, setIsOpen] = React.useState(false);
    const [mode, setMode] = React.useState<CrudMode>(initialMode);
    const [payload, setPayload] = React.useState<unknown>();

    const open = React.useCallback((nextMode: CrudMode, nextPayload?: unknown) => {
        setMode(nextMode);
        setPayload(nextPayload);
        setIsOpen(true);
    }, []);

    const close = React.useCallback(() => setIsOpen(false), []);

    return { open, close, isOpen, mode, payload };
}


export function CrudSheet(
    props: React.PropsWithChildren<{
        controller: CrudSheetController;
        titles?: { create: string; edit: string };
        side?: "right" | "left";
        className?: string;
    }>
) {
    const { controller, titles = { create: "Create", edit: "Edit" }, side = "right", className, children } = props;

    return (
        <Sheet open={controller.isOpen} onOpenChange={(o) => (!o ? controller.close() : null)}>
            <SheetContent side={side} className={className}>
                <SheetHeader>
                    <SheetTitle>{controller.mode === "create" ? titles.create : titles.edit}</SheetTitle>
                </SheetHeader>
                <div className="pt-4">{children}</div>
            </SheetContent>
        </Sheet>
    );
}