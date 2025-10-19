import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { columns, Client } from '@/components/clients/columns'
import { DataTable } from '@/components/ui/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: dashboard().url,
    },
];

function getData(): Client[]{
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <DataTable columns={columns} data={data}></DataTable>

            </div>
        </AppLayout>
    );
}
