<?php

use App\Http\Controllers\Api\Admin\GetProductCategoriesController;
use App\Http\Controllers\Api\Admin\ProductCategoryController;
use App\Http\Controllers\Api\Admin\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

require __DIR__ . '/auth.php';

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'admin', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/product-categories/all', GetProductCategoriesController::class);
    Route::apiResource('/product-categories', ProductCategoryController::class);
    Route::apiResource('/products', ProductController::class);
});
