<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $email = trim((string) $this->input('email'));
        $this->merge([
            'full_name' => trim((string) $this->input('full_name')),
            'phone'     => trim((string) $this->input('phone')),
            'email'     => $email !== '' ? strtolower($email) : null,
        ]);
    }

    public function rules(): array
    {
        return [
            'full_name' => ['bail', 'required', 'string', 'max:255'],
            'phone'     => ['bail', 'required', 'string', 'max:64'],
            'email'     => ['nullable', 'email', 'max:255', 'unique:clients,email'],
        ];
    }
}
