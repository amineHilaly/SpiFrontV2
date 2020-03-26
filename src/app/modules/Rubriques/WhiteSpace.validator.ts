import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class WhiteSpaceValidator {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).startsWith(' ') || (control.value as string).endsWith(' ') ){
            return {cannotContainSpace: true}
        }
  
        return null;
    }
}