<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCategoryResource;
use App\Models\ProductCategory;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GetProductCategoriesController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    public function __invoke(): AnonymousResourceCollection
    {
        $productCategories = ProductCategory::select(['id', 'name'])->get();
        return ProductCategoryResource::collection($productCategories);
    }
}
