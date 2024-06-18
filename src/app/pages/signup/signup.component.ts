import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import { AuthService } from 'src/app/service/userservice/auth.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';




export function passwordMatcher(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password || !confirmPassword) return null;
  return password.value === confirmPassword.value ? null : { mismatch: true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit{
  signupForm!: FormGroup;
  hide = true;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  
  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],       
        address: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(50)]],
        number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$'),Validators.maxLength(15)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(15),Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$')]],
      },
      { validator: passwordMatcher }
    );
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
     this.authService.signUp(this.signupForm.value).subscribe(
        {
          next:response => {
            this.isLoading = false; 
            const email=  this.signupForm.get('email')?.value;
            this.authService.setEmail(email);
            this.router.navigate(['/emailverify']);
            this.toastr.success(response.message, 'Success');
          },
          error:error => {
            this.isLoading = false;
            this.router.navigate(['/signup']);
            this.toastr.error(error.error.message, 'Error');
          }
        }
      );
    }
  }

  reset(){
    this.signupForm.reset();
  }

  
}


