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
        $name = date('ymd') . time() . '.' . $data['thumbnail']->extension();
        $data['thumbnail'] = $data['thumbnail']->storeAs('images/products', $name);
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
        if (isset($data['thumbnail'])) {
            Storage::delete('app/images/products/' . $product->thumbnail);
            $name = date('ymd') . time() . '.' . $data['thumbnail']->extension();
            $data['thumbnail'] = $data['thumbnail']->storeAs('images/products', $name);
        }
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

        if (isset($data['category_id'])) {
            $categoryIds = is_array($data['category_id']) ? $data['category_id'] : explode(',', $data['category_id']);
            $query->whereIn('category_id', $categoryIds);
        }

        return $query->paginate(10);
    }

}