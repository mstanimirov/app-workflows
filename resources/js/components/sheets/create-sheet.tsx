import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


// Context allows inner forms to close the sheet without prop drilling
const CreateSheetContext = React.createContext<{ close: () => void } | null>(null);
export const useCreateSheet = () => {
    const ctx = React.useContext(CreateSheetContext);
    if (!ctx) throw new Error("useCreateSheet must be used within <CreateSheet>");
    return ctx;
};


export type CreateSheetProps = {
    title: string;
    description?: string;
    /** control from parent */
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Optional className for sheet content */
    contentClassName?: string;
    /** Text on footer submit button */
    submitLabel?: string;
    /** HTML form id that the submit button should trigger */
    formId?: string;
    children: React.ReactNode;
};


export default function CreateSheet({
    title,
    description,
    open,
    onOpenChange,
    contentClassName,
    submitLabel = "Create",
    formId = "sheet-form",
    children,
}: CreateSheetProps) {

    const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);

    return (
        <CreateSheetContext.Provider value={{ close }}>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent side="right" className={cn("w-full sm:max-w-lg", contentClassName)}>
                    <SheetHeader className="mb-4">
                        <SheetTitle>{title}</SheetTitle>
                        {description && <SheetDescription>{description}</SheetDescription>}
                    </SheetHeader>
                    <div className="space-y-4">

                        {children}

                        {/* Footer */}
                        <SheetFooter className="flex gap-2 pt-2">
                            <Button type="submit" form={formId}>{submitLabel}</Button>
                            <Button type="button" variant="ghost" onClick={close}>Cancel</Button>
                        </SheetFooter>
                    </div>
                </SheetContent>
            </Sheet>
        </CreateSheetContext.Provider>
    );
}