<?php

namespace App\Http\Controllers\Api\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductCategoryRequest;
use App\Http\Requests\UpdateProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Models\ProductCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $productCategories = ProductCategory::all();

        return ProductCategoryResource::collection($productCategories);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param StoreProductCategoryRequest $request
     * @return ProductCategoryResource
     */
    public function store(StoreProductCategoryRequest $request): ProductCategoryResource
    {
        $data = $request->validated();
        $productCategory = ProductCategory::create($data);

        return(new ProductCategoryResource($productCategory))->additional(ResponseHelper::stored());
    }

    /**
     * Display the specified resource.
     * 
     * @param ProductCategory $productCategory
     * @return ProductCategoryResource
     */
    public function show(ProductCategory $productCategory): ProductCategoryResource
    {
        return new ProductCategoryResource($productCategory);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param UpdateProductCategoryRequest $request
     * @param ProductCategory $productCategory
     * @return ProductCategoryResource
     */
    public function update(UpdateProductCategoryRequest $request, ProductCategory $productCategory): ProductCategoryResource
    {
        $data = $request->validated();
        $productCategory->update($data);

        return(new ProductCategoryResource($productCategory))->additional(ResponseHelper::updated($productCategory));
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param ProductCategory $productCategory
     * @return Response|JsonResponse
     */
    public function destroy(ProductCategory $productCategory): Response|JsonResponse
    {
        $productCategory->delete();
        return response()->noContent();
    }
}
