import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/userservice/auth.service';
import {Router} from '@angular/router';
import { PostserviceService } from 'src/app/service/postservice/postservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit{
  createPost!: FormGroup;

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private router: Router,
   private toastr: ToastrService,
    private postService: PostserviceService
   ) { }

  ngOnInit() {
    this.createPost = this.fb.group({
      username: [localStorage.getItem('username'), [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
    });
  }
onSubmit() {
  if (this.createPost.valid) {
    this.postService.createpost(this.createPost.value).subscribe(
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

  reset(){
    this.createPost.reset();

  }
}
