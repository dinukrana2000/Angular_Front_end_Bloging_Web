import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/userservice/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit{
hide = true;
resetForm!: FormGroup;

constructor(private fb: FormBuilder,private router:Router,private authService:AuthService,private toaster:ToastrService) {}



ngOnInit() {
  this.resetForm = this.fb.group({
    email:[ localStorage.getItem('resetPasswordEmail'), [Validators.required]],
    pwd: ['', [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$')]],
    confirm_pwd: ['', [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$')]],
  });
}

  onSubmit() {
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.resetForm.value).subscribe(
        {
          next:response => {
            this.router.navigate(['/login']);
            this.toaster.success(response.message, 'Success');
          },
          error:error => {
              this.router.navigate(['/resetpassword']);
              this.toaster.error(error.error.message, 'Error');
          }
        }
      );
    }
  }

  reset(){
    this.resetForm.reset();
  }

}
