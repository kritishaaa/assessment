<?php

namespace App\Http\Requests;

use App\Rules\ValidSlug;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
        return [
            'name'=> 'required', 'string', 'max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                "unique:product_categories,slug,NULL,id,deleted_at,NULL",
                new ValidSlug,
            ],
            'categories' => 'required|array',
            'categories.*' => 'required|exists:product_categories,id',
            'description' => 'required|string|max:5000',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'status' => 'boolean',
        ];
    }
}
