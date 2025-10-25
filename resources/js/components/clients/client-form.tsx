import * as React from "react";
import { useForm } from "@inertiajs/react";
import { FormShell } from "@/components/form/form-shell";
import { TextField } from "@/components/form/text-field";
import { PhoneField } from "@/components/form/phone-field";

import { store as clientStore, update as clientUpdate } from "@/routes/clients"

export type Client = {
    id: number;
    full_name: string;
    phone: string;
    email?: string | null;
};

export function ClientForm({
    mode,
    initial,
    onCancel,
    onSuccess,
}: {
    mode: "create" | "edit";
    initial?: Partial<Client>;
    onCancel?: () => void;
    onSuccess?: () => void;
}) {
    const { data, setData, post, put, processing, errors, reset, wasSuccessful } = useForm<Client>({
        id: initial?.id,
        full_name: initial?.full_name ?? "",
        phone: initial?.phone ?? "",
        email: initial?.email ?? "",
    } as Client);

    React.useEffect(() => {
        if (wasSuccessful) {
            onSuccess?.();
            reset();
        }
    }, [wasSuccessful]);

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (mode === "create") {
            post(clientStore.url());
        } else {
            put(clientUpdate.url({ client: data.id }));
        }
    }

    return (
        <FormShell onSubmit={submit} submitting={processing} onCancel={onCancel} submitLabel={mode === "create" ? "Create" : "Update"}>
            <TextField
                label="Full name"
                name="full_name"
                value={data.full_name}
                onChange={(e) => setData("full_name", e.target.value)}
                required
                error={errors.full_name}
            />

            <PhoneField
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                required
                error={errors.phone}
            />

            <TextField
                label="Email (optional)"
                name="email"
                value={data.email ?? ""}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="name@example.com"
                error={errors.email}
            />
        </FormShell>
    );
}