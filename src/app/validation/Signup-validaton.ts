import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        console.log('usernameValidator called', control.value);

      const value = control.value;
      if (!value) {
        return null;
      }
      const usernameRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/; //at lease one dift required
      return usernameRegex.test(value) ? null : { invalidUsername: true };
    };
  }



  static passwordMatcher(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) return null;
    return password.value === confirmPassword.value ? null : { mismatch: true };
  }



  static resetpasswordMatcher(control: AbstractControl): ValidationErrors | null {
    const password = control.get('pwd');
    const confirmPassword = control.get('confirm_pwd');
    if (!password || !confirmPassword) return null;
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }


}
