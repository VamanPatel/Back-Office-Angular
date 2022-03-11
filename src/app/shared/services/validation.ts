import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {
    static numberValidator(value: AbstractControl): ValidationErrors | null {
        if (value.pristine) {
            return null;
        }
        const NUMBER_REGEXP = /^[0-9]*$/;
        value.markAsTouched();
        if (NUMBER_REGEXP.test(value.value)) {
            return null;
        }
        return {
            invalidNumber: true
        };

    }

    static phoneValidator(value: AbstractControl): ValidationErrors | null {
        if (value.pristine) {
            return null;
        }
        const NUMBER_REGEXP = /^\d{10}$/;
        value.markAsTouched();
        if (NUMBER_REGEXP.test(value.value)) {
            return null;
        }
        return {
            invalidPhone: true
        };

    }

    static amountValidator(value: AbstractControl): ValidationErrors | null {
        if (value.pristine) {
            return null;
        }
        const NUMBER_REGEXP = /^[1-9]\d*(\.\d+)?$/;
        value.markAsTouched();
        if (NUMBER_REGEXP.test(value.value)) {
            return null;
        }
        return {
            invalidAmount: true
        };

    }

    static emailValidator(value: AbstractControl): ValidationErrors | null {
        if (value.pristine) {
            return null;
        }
        const NUMBER_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        value.markAsTouched();
        if (NUMBER_REGEXP.test(value.value)) {
            return null;
        }
        return {
            invalidEmail: true
        };

    }

    static passwordMatch(control: AbstractControl): ValidationErrors | null {
        const paswd = control.root.get('password');
        if (paswd && control.value !== paswd.value){
         return {
             passwordMatch: false
         };
        }
        return null;
    }

    static passwordStrength(value: AbstractControl): ValidationErrors | null {
        if (value.pristine) {
            return null;
        }
        const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        value.markAsTouched();
        if (PASSWORD_REGEX.test(value.value)) {
            return  null;
        }
        else {
            return {
                invalidPassword: true
            };
        }

    }
}
