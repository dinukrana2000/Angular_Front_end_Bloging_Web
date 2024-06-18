import { Component,OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from 'src/app/service/userservice/auth.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fogotpassword',
  templateUrl: './fogotpassword.component.html',
  styleUrls: ['./fogotpassword.component.css']
})
export class FogotpasswordComponent implements OnInit{
  fogotpassword!:FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private toastr:ToastrService) {
    
  }


  ngOnInit(){
    this.fogotpassword = this.fb.group({
      email: ['', [Validators.required, Validators.email,Validators.maxLength(100)]],
    
    });
  }
  
  submit(){
    if (this.fogotpassword.valid) {
      this.authService.fogot(this.fogotpassword.value).subscribe(
       { next:response => {
          const email=this.fogotpassword.get('email')?.value;
          localStorage.setItem('resetPasswordEmail', email);
          this.router.navigate(['/login']);
          this.toastr.success(response.message, 'Success');
        },
        error:error => {
          this.router.navigate(['/fogotpassword']);
          this.toastr.error(error.error.message, 'Error');
        }
    });
    }}

    reset(){
      this.fogotpassword.reset();
    }


}
