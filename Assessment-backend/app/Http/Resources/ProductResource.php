<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\FlareClient\FlareMiddleware\CensorRequestBodyFields;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'thumbnail' => $this->thumbnail_url,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'status' => $this->status,
            'categories' => ProductCategoryResource::collection($this->whenLoaded('categories')),
        ];
    }
}
