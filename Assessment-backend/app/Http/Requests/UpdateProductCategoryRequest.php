<?php

namespace App\Http\Requests;

use App\Rules\ValidSlug;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $productCategoryId = $this->route()->originalParameter('product_category');

        return [
            'name'=> ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                "unique:product_categories,slug,{$productCategoryId},id,deleted_at,NULL",
                new ValidSlug,
            ],
        ];
    }
}
