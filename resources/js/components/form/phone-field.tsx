import * as React from "react";
import { TextField } from "./text-field";

const PHONE_REGEX = /^(\+?[0-9]{6,15})$/; // simple but practical

export function PhoneField({
    label,
    name = "phone",
    value,
    onChange,
    error,
    required = true,
}: {
    label?: string;
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
}) {
    return (
        <TextField
            label={label ?? "Phone"}
            name={name}
            value={value}
            onChange={onChange}
            error={error || (required && value && !PHONE_REGEX.test(value) ? "Invalid phone" : undefined)}
            required={required}
            placeholder="e.g. +359888123456"
        />
    );
}