<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class LogoutController extends Controller
{
   /**
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logged out successfully',]);
    }
}
