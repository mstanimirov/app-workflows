import * as React from "react";
import { Button } from "@/components/ui/button";

export function FormShell(
    props: React.PropsWithChildren<{
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
        submitting?: boolean;
        submitLabel?: string;
        onCancel?: () => void;
    }>
) {
    const { children, onSubmit, submitting, submitLabel = "Save", onCancel } = props;


    return (
        <form onSubmit={onSubmit} className="space-y-4 p-4">
            <div className="grid gap-4">{children}</div>
            <div className="flex justify-end gap-2 pt-2">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={submitting}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}