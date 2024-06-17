import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailverifyComponent } from './pages/emailverify/emailverify.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { FogotpasswordComponent } from './pages/fogotpassword/fogotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { AuthGuard } from './service/userservice/auth.guard';
import { ViewComponent } from './pages/view/view.component';
import { NewComponent } from './pages/new/new.component';
import { ViewmyComponent } from './pages/viewmy/viewmy.component';
import { UpdatepostComponent } from './pages/updatepost/updatepost.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent, },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  {path: 'emailverify', component: EmailverifyComponent},
  {path: 'login', component: LoginComponent,},
  {path: 'forgotpassword', component: FogotpasswordComponent},
  {path: 'resetpassword', component: ResetpasswordComponent},
  {path: 'view', component: ViewComponent,canActivate:[AuthGuard]},
  {path: 'new', component: NewComponent,canActivate:[AuthGuard]},
  {path: 'viewmy', component: ViewmyComponent,canActivate:[AuthGuard]},
  {path: 'updatepost/:id', component: UpdatepostComponent,canActivate:[AuthGuard]}
  

];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
