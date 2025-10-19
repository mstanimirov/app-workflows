import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"

export type Client = {
    id: number;
    full_name: string;
    phone: string;
    email?: string;
};

export const columns: ColumnDef<Client, any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: (ctx) => <span className="text-muted-foreground">{ctx.getValue()}</span>,
    },
    {
        accessorKey: "full_name",
        header: "Full Name",
        cell: (ctx) => <span className="font-medium">{ctx.getValue()}</span>,
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: (ctx) => <span className="font-medium">{ctx.getValue()}</span>,
    },
    {
        accessorKey: "email",
        header: 'Email',
        cell: (ctx) => <span className="font-medium">{ctx.getValue() ? ctx.getValue() : "—"}</span>,
    },
]