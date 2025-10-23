import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { columns, Client } from '@/components/clients/columns'
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CrudSheet } from '@/components/crud-sheet';
import { ClientForm } from '@/components/clients/client-form';
import { useCrudSheet } from '@/hooks/use-crud-sheet';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: dashboard().url,
    },
];

function getData(): Client[] {
    return [
        {
            id: 0,
            full_name: "Мартин Станимиров",
            phone: "0888870708",
        },
        {
            id: 1,
            full_name: "Тест Клиент",
            phone: "0897665543",
            email: "k_test@test.com",
        }
    ];
}

export default function Clients() {

    const data = getData();

    const { sheet, record, openCreate, openEdit } = useCrudSheet<Client>();

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
                    data={data}
                />

                <CrudSheet controller={sheet} titles={{ create: "Create client", edit: "Edit client" }}>
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
