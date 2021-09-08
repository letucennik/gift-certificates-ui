import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password')!.value;
        if(AC.get('repeatPassword')!.touched || AC.get('repeatPassword')!.dirty) {
            let verifyPassword = AC.get('repeatPassword')!.value;

            if(password != verifyPassword) {
                AC.get('repeatPassword')!.setErrors( {MatchPassword: true} )
            } else {
                return null
            }
        }
    }
}