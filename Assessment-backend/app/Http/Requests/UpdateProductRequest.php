<?php

namespace App\Http\Requests;

use App\Rules\ValidSlug;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

     /**
     * @return void
     */
    protected function prepareForValidation(): void
    {
        if ($this->categories && is_string($this->categories)) {
            $this->merge([
                'categories' => explode(',', $this->categories),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $productId = $this->route()->originalParameter('product');
        return [
            'name'=> 'required', 'string', 'max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                new ValidSlug,
                "unique:quizzes,slug,{$productId},id,deleted_at,NULL",
            ],
            'category_id' => 'nullable|exists:product_categories,id,deleted_at,NULL',
            'thumbnail' => 'required|image|mimes:jpg,png,jpeg|max:2048',
            'description' => 'required|string|max:5000',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'status' => 'boolean',
            'categories' => 'required|array',
            'categories.*' => 'required|exists:product_categories,id',
        ];
    }
}
