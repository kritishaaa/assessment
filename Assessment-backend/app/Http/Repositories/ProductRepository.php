<?php

namespace App\Http\Repositories;

use App\Models\Product;
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
}