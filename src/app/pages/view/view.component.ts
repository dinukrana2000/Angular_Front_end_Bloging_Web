import { Component, OnInit } from '@angular/core';
import {PostserviceService} from 'src/app/service/postservice/postservice.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  blogPosts:any = [];
  

  constructor(private postService:PostserviceService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts)=>{
      this.blogPosts = posts;
    });
  }
}
