import { AbstractControl } from '@angular/forms';

/**
 * Método para validar que dos campos sean iguales
 * @param {string} controlName : nombre del primer campo
 * @param {string} matchingControlName : nombre del segundo campo
 * @returns {AbstractControl || null} : retorna AbstractControl si son matchables y null si no lo son.
 */
export function MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        const control = group.get(controlName);
        const matchingControl = group.get(matchingControlName);

        if (!control || !matchingControl) {
            return null;
        }

        // return if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    }
}
