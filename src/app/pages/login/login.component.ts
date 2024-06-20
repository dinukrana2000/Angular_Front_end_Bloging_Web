import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/userservice/auth.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    
  }


  ngOnInit(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(15),Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$')]]
    });
  }

  
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        {next:response => {
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/view']);
          localStorage.setItem('username',this.loginForm.get('username')?.value);
         
        },
        error:error => {
          this.toastr.error(error.error.message, 'Error');
            if(error.error.message==='User is not verified Please verify email first'){
            this.router.navigate(['/emailverify']);
          }else{
            this.router.navigate(['/login']);

          }
        }}
      );
    }
  }
  reset(){
    this.loginForm.reset();
  }

}
