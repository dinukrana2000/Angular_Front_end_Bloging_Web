import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import {PostserviceService} from 'src/app/service/postservice/postservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  blogPosts:any = [];
  isDarkMode:boolean = false;
  

  constructor(private postService:PostserviceService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.postService.getPosts().pipe(
      catchError(Response => {
        this.toaster.error(Response.error.error + ''+':'+ Response.error.message);
        return of([]); // return an empty array if there's an error 
      })
    ).subscribe((posts)=>{
      this.blogPosts = posts;
      this.toaster.success('Posts loaded successfully');
    });
  }

  onColorModeToggle(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
  }
}
