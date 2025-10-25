<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
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
        $clientId = $this->route('clients') ?? $this->route('client') ?? $this->route('id');

        return [
            'full_name' => ['bail', 'required', 'string', 'max:255'],
            'phone'     => [
                'bail',
                'required',
                'string',
                'max:64',
                Rule::unique('clients', 'phone')->ignore($clientId),
            ],
            'email'     => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('clients', 'email')->ignore($clientId),
            ],
        ];
    }
}
