import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';// reactive extension for js

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private email:String='';
  private username = '';
  isLoggedIn: boolean = false;


  constructor(private http: HttpClient) { }

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/signup`, user);
  }

  setEmail(email:String){
    this.email=email;
  }

  getEmail(){
    return this.email;
  }

  
  
//any means any type
//otp is
emailVerify(verificationData: {email:String,otp:any}): Observable<any> {
  return this.http.put(`${this.apiUrl}/user/verifyEmail`, verificationData);
}

login(user: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/user/login`, user).pipe(
  map((response: any) => {
    if (response&&response.token) {
      localStorage.setItem('JWT_Token', response.token);
      this.isLoggedIn = true;
    }
    return response;
  })
);
}

setusername(username: any) {
  this.username = username;
}

getUsername() {
  return this.username;
}



fogot(email: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/user/forgotPassword`, email);

}


resetPassword(resetData:any): Observable<any> {
  return this.http.put(`${this.apiUrl}/user/resetPassword`, resetData);
}

logout(): void {
  localStorage.removeItem('JWT_Token');
  this.isLoggedIn = false;
}

isAuthenticated(): boolean {
  return !!localStorage.getItem('JWT_Token');
}



}
