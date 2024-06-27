import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/userservice/auth.service';
import {Router} from '@angular/router';
import { PostserviceService } from 'src/app/service/postservice/postservice.service';
import { ToastrService } from 'ngx-toastr';
import { PostData } from 'src/app/pages/new/new.model';
import { NgForm } from '@angular/forms';


@Component({  
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit{

  postdata: PostData = new PostData(localStorage.getItem('username')||'','','','');

  constructor(
    private authService: AuthService,
    private router: Router,
   private toastr: ToastrService,
    private postService: PostserviceService
   ) { }

  ngOnInit() {

  }
onSubmit(form: NgForm) {
  if (form.valid) {
    
    this.postService.createpost(this.postdata).subscribe(
      {
        next:response => {
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/new']);
        },
        error:error => {
          this.toastr.error(error.error.message, 'Error');
          this.router.navigate(['/new']);
        }
      }
    );
  }
}

  reset(form:NgForm){
    form.resetForm();

  }
}
