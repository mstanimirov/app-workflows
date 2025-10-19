import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { columns, Client } from '@/components/clients/columns'
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateSheet from '@/components/sheet/create-sheet';
import React from 'react';

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

    const formId = "client-create-form";
    const [open, setOpen] = React.useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center gap-3">
                    <Button onClick={() => setOpen(true)} >
                        <Plus />
                        Client
                    </Button>
                </div>

                <DataTable columns={columns} data={data}></DataTable>

                <CreateSheet
                    title="New client"
                    description="Fill out the details below and hit Create."
                    open={open}
                    onOpenChange={setOpen}
                    submitLabel="Create"
                    formId={formId}
                >
                    <></>
                </CreateSheet>

            </div>
        </AppLayout>
    );
}
