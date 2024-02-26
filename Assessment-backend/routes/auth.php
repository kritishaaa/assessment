<?php

use App\Http\Controllers\Api\Auth\UserLoginController;
use App\Http\Controllers\Api\Auth\UserRegistrationController;
use Illuminate\Support\Facades\Route;

Route::post('/register', UserRegistrationController::class)
            ->middleware('guest')
            ->name('register');

Route::get('/login', UserLoginController::class)
            ->middleware('guest')
            ->name('login');


