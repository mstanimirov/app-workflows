// resources/js/hooks/useCrudSheet.ts
import * as React from "react";
import { useCrudSheetController } from "@/components/crud-sheet";


export function useCrudSheet<T>() {
    const sheet = useCrudSheetController();
    const [record, setRecord] = React.useState<T | null>(null);

    const openCreate = React.useCallback(() => {
        setRecord(null);
        sheet.open("create");
    }, [sheet]);

    const openEdit = React.useCallback((row: T) => {
        setRecord(row);
        sheet.open("edit", row);
    }, [sheet]);

    return { sheet, record, openCreate, openEdit } as const;
}