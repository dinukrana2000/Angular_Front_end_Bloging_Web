  import { Component, OnInit } from '@angular/core';
  import { FormGroup,FormBuilder,Validators } from '@angular/forms';
  import { AuthService } from 'src/app/service/userservice/auth.service';
  import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
  @Component({
    selector: 'app-emailverify',
    templateUrl: './emailverify.component.html',
    styleUrls: ['./emailverify.component.css']
  })
  export class EmailverifyComponent implements OnInit {
    emailverifyForm!: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,private toastr:ToastrService) {
     
    }

    ngOnInit() {
      this.emailverifyForm = this.fb.group({
        email: [{value:this.authService.getEmail(),disabled:true}, [Validators.required]],
        otp: ['', [Validators.required, Validators.maxLength(6)]]
      });
    }

    onSubmit() {
      if (this.emailverifyForm.valid) {
        const email = this.emailverifyForm.get('email')?.value;
        const otp = this.emailverifyForm.get('otp')?.value;
        this.authService.emailVerify({email,otp}).subscribe(
         { next:response => {
            this.toastr.success(response.message, 'Success');
            this.router.navigate(['/login']);
          },
          error:error => {
            this.toastr.error(error.error.message, 'Error');
          }
      });
      }
    }

    reset(){
      this.emailverifyForm.reset();
    }


  }
