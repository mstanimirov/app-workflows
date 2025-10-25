<?php

namespace App\Http\Controllers;

use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{

    public function index(Request $request)
    {

        $page = (int) $request->input('page') ?? $request->query('page', 1);

        $clients = Client::query()->latest()->paginate(3, ['*'], 'page', $page);

        return Inertia::render('clients', [
            'clients' => $clients,
        ]);
    }

    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->validated());

        return redirect()->back()
            ->with('success', 'Client created.')
            ->with('created', ['entity' => 'client', 'client' => [
                'id'        => $client->id,
                'full_name' => $client->full_name,
                'phone'     => $client->phone,
                'email'     => $client->email,
            ]]);
            
    }

    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->fill($request->validated());
        $client->save();

        return redirect()->back()->with('success', 'Client updated.');
    }
}
