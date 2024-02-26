<?php

use App\Http\Controllers\Api\Auth\EmailVerificationController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\UserLoginController;
use App\Http\Controllers\Api\Auth\UserRegistrationController;
use Illuminate\Support\Facades\Route;

Route::post('/register', UserRegistrationController::class)
            ->middleware('guest')
            ->name('register');

Route::get('/login', UserLoginController::class)
            ->middleware('guest')
            ->name('login');

Route::get('/verify-email/{id}/{hash}', EmailVerificationController::class)
            ->middleware(['signed', 'throttle:6,1'])
            ->name('verification.verify');

Route::post('/logout', LogoutController::class)
            ->middleware('auth:sanctum')
            ->name('logout');


