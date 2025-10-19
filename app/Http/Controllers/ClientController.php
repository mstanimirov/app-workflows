<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    
    public function index(){

        $clients = Client::query()->latest();

        return Inertia::render('clients', [
            'clients' => $clients,
        ]);

    }

}
