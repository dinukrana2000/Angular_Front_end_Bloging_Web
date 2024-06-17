import { Component,OnInit } from '@angular/core';
import { PostserviceService } from 'src/app/service/postservice/postservice.service';
import { DialogboxdeleteComponent } from 'src/app/components/dialogboxdelete/dialogboxdelete.component';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


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
    forkJoin([
      this.postService.getMyPosts(),
      this.postService.getuseremail()
      ]).subscribe( ([posts, email]) => {
      this.blogPosts = posts;
      this.userEmail = email;
    } );
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

