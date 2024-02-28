<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'thumbnail',
        'description',
        'quantity',
        'price',
        'status'
    ];

    /**
     * @var array<int,string>
     */
    public $appends = [
        'thumbnail_url'
    ];

    /**
     * @return string
     */
    public function getThumbnailUrlAttribute(): string
    {
        return asset($this->thumbnail);
    }

    /**
     * @return BelongsToMany
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(ProductCategory::class, 'product_category', 'product_id', 'category_id')
            ->withTimestamps();
    }
}
