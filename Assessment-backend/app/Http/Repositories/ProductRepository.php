<?php

namespace App\Http\Repositories;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class ProductRepository
{
    /**
     * @param array $data
     * @return Product
     */
    public function store(array $data): Product
    {
        $product = Product::create($data);
        $product->categories()->sync($data['categories']);
        return $product->fresh();
    }

    /**
     * @param Product $product
     * @return Product
     */
    public function show(Product $product): Product
    {
        return $product->load('categories:id,name');
    }

    /**
     * @param Product $product
     * @param array $data
     * @return Product
     */
    public function update(Product $product, array $data): Product
    {        
        $product->categories()->sync($data['categories']);
        $product->update($data);

        return $product;
    }

    /**
     * @param array $data
     * @return LengthAwarePaginator
     */
    public function getFilteredProduct($data): LengthAwarePaginator
    {
        $query = Product::with('categories:id,name');

        if (isset($data['title'])) {
            $query->where('title', 'like', '%' . $data['title'] . '%');
        }

        if (isset($data['status'])) {
            $query->where('status', $data['status']);
        }

        if (isset($data['categories'])) {
            $categoryIds = is_array($data['categories']) ? $data['categories'] : explode(',', $data['categories']);
            $query->whereHas('categories', function ($q) use ($categoryIds) {
                $q->whereIn('product_categories.id', $categoryIds); 
            });
        }
        
        return $query->paginate(10);
    }

}