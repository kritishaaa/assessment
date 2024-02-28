<?php

namespace App\Http\Controllers\Api\Admin;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Repositories\ProductRepository;
use App\Http\Requests\FilterProductRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    private ProductRepository $productRepository;

    /**
     * @param  ProductRepository  $productRepository
     */
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * Display a listing of the resource.
     * 
     * @param FilterProductRequest $request
     * @return AnonymousResourceCollection
     */
    public function index(FilterProductRequest $request): AnonymousResourceCollection
    {
        $data = $request->validated();
        $products = $this->productRepository->getFilteredProduct($data);

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param StoreProductRequest $request
     * @return ProductResource
     */
    public function store(StoreProductRequest $request): ProductResource
    {
        $data = $request->validated();
        $product = $this->productRepository->store($data);

        return (new ProductResource($product))->additional(ResponseHelper::stored());
    }

    /**
     * Display the specified resource.
     * 
     * @param Product $product
     * @return ProductResource
     */
    public function show(Product $product): ProductResource
    {
        $product = $this->productRepository->show($product);
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     * @param UpdateProductRequest $request
     * @param Product $product
     * @return ProductResource
     */
    public function update(UpdateProductRequest $request, Product $product): ProductResource
    {
        $data = $request->validated();
        $product = $this->productRepository->update($product, $data);

        return (new ProductResource($product))->additional(ResponseHelper::updated($product));
    }

     /**
     * @param Product $product
     * @return Response
     */
    public function destroy(Product $product): Response
    {
        $product->categories()->detach();
        $product->delete();
        return response()->noContent();
    }
}
