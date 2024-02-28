<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidSlug implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $pattern = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/';

        if (!preg_match($pattern, $value))
        {
            $fail('The :attribute must be an valid slug.');
        }
    }
}
