import { Component,OnInit } from '@angular/core';
import { PostserviceService } from 'src/app/service/postservice/postservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit{
  updatepost!: FormGroup;
  postId!: string;

  

  constructor(
    private postService: PostserviceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.updatepost = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
    });
    
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.loadPost();
    });

  }

  loadPost() {
    this.postService.getPostById(this.postId).subscribe(post => {
      this.updatepost.patchValue({
        title: post.title,
        author: post.author,
        content: post.content
      });
    });
  }

  onSubmit() {
    if (this.updatepost.valid) {
      this.postService.updatePost(this.postId,this.updatepost.value).subscribe(
        {
          next: (response: any) => {
            this.toastr.success(response.message, 'Success');
            this.router.navigate(['/viewmy']);
          },
          error: error => {
            this.toastr.error(error.error.message, 'Error');
            this.router.navigate(['/updatepost']);
          }
        }
      );
    }
  }

  reset() {
    this.updatepost.reset();
  }

}
