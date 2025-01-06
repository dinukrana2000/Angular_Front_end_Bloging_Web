import { Component,OnInit } from '@angular/core';
import { PostserviceService } from 'src/app/service/postservice/postservice.service';
import { DialogboxdeleteComponent } from 'src/app/components/dialogboxdelete/dialogboxdelete.component';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin,of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-viewmy',
  templateUrl: './viewmy.component.html',
  styleUrls: ['./viewmy.component.css']
})
export class ViewmyComponent implements OnInit{
  blogPosts:any = [];
  userEmail:String = '';

  constructor(private postService: PostserviceService,private toastr: ToastrService,
    private dialog: MatDialog
  ) { }
  

  ngOnInit() {
    forkJoin({
      posts: this.postService.getMyPosts().pipe(
        catchError(Response => {
          this.toastr.error('Faileds to load My posts(fork join)');
          this.toastr.error(Response.error.error + ''+':'+ Response.error.message);
          return of([]); 
        })
      ),
      email: this.postService.getuseremail().pipe(
        catchError(error => {
          this.toastr.error('Failed to load My email (fork join)');
          return of(''); // Return an empty string if there's an error
        })
      )
    }
    ).subscribe(({ posts, email }) => {
        this.blogPosts = posts;
        this.userEmail = email;
        
        if(this.blogPosts.length>0 && email!=''){
          this.toastr.success('My Posts and email loaded successfully');
        }
      });
  }

  delete(postId: any) {
    const dialogRef = this.dialog.open(DialogboxdeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.deletePost(postId).subscribe(
          {
            next: (response: any) => {
              this.toastr.success(response.message, 'Success');
              this.ngOnInit();
            },
            error: (error: any) => {
              this.toastr.error(error.error.message, 'Error');
            }
          }
        );
      }
    });
  
  }

}

