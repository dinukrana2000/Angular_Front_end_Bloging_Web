import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {
  private apiUrl = environment.apiUrl;
  private username = localStorage.getItem('username')?.trim();

  constructor(private http:HttpClient) { }

  getPosts():Observable<HttpEvent<any>>{
    return this.http.get<any>(`${this.apiUrl}/post/getAll`);
  }
  createpost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/post/create`, post);
  }

  getMyPosts():Observable<HttpEvent<any>>{
    return this.http.get<any>(`${this.apiUrl}/post/getByUsername/${this.username}`);
  }

  getPostById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/post/getByid/${id}/${this.username}`);
  }

  deletePost(id: any): Observable<HttpEvent<any>> {
    return this.http.delete<any>(`${this.apiUrl}/post/deletePostByid/${id}`);
    
  }

  updatePost(id:any,post: any): Observable<HttpEvent<any>> {
    return this.http.put<any>(`${this.apiUrl}/post/updateByidAndusername/${id}/${this.username}`, post);
    
  }

  getuseremail(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/user/getemail/${this.username}`, { responseType: 'text' as 'json'});
  }
  
}
