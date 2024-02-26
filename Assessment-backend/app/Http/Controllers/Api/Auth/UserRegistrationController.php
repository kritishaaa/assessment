<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UserRegistrationRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Response;

class UserRegistrationController extends Controller
{
    /**
     * @param UserRegistrationRequest $request
     * @return Response
     */
    public function __invoke(UserRegistrationRequest $request): Response
    {
        $data = $request->validated();
        $user = User::create($data);

        event(new Registered($user));
        return response()->noContent();
    }
}
