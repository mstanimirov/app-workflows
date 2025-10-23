import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


export function TextField({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    error,
    required,
    className,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    className?: string;
}) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Label htmlFor={name}>
                {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Input id={name} name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} />
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}