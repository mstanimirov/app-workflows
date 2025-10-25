import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { PaginationPayload, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
//import { columns, Client } from '@/components/clients/columns'
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CrudSheet } from '@/components/crud-sheet';
import { Client, ClientForm } from '@/components/clients/client-form';
import { useCrudSheet } from '@/hooks/use-crud-sheet';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: dashboard().url,
    },
];

function getData(): Client[] {
    return [
        {
            id: 1,
            full_name: "Мартин Станимиров",
            phone: "0888870708",
        },
        {
            id: 0,
            full_name: "Тест Клиент",
            phone: "0897665543",
            email: "k_test@test.com",
        }
    ];
}

export default function Clients() {

    const { props }: any = usePage();
    const list: PaginationPayload<Client> = props.clients;
    const clients = list.data;

    const { sheet, record, openCreate, openEdit } = useCrudSheet<Client>();

    const data = getData();

    const columns: ColumnDef<Client, any>[] = [
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
            cell: (ctx) => <Button variant="link" className="font-medium" onClick={() => openEdit(ctx.row.original)}>{ctx.getValue()}</Button>,
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


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center gap-3">
                    <Button onClick={openCreate} >
                        <Plus />
                        Client
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={clients}
                />

                <CrudSheet
                    controller={sheet}
                    titles={{ create: "Create client", edit: "Edit client", }}
                    descriptions={{ create: "Add a new client.", edit: "View/Edit client", }}
                    className='sm:max-w-md'
                >
                    <ClientForm
                        mode={sheet.mode}
                        initial={record ?? undefined}
                        onCancel={sheet.close}
                        onSuccess={sheet.close}
                    />
                </CrudSheet>

            </div>
        </AppLayout >
    );
}
