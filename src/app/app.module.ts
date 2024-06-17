import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { EmailverifyComponent } from './pages/emailverify/emailverify.component';
import { LoginComponent } from './pages/login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FogotpasswordComponent } from './pages/fogotpassword/fogotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { JwtInterceptor } from './service/userservice/jwt.interceptor';
import { ViewComponent } from './pages/view/view.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from "@angular/material/autocomplete"
import {MatMenuModule} from "@angular/material/menu"
import {MatBadgeModule} from "@angular/material/badge"
import {MatSliderModule} from "@angular/material/slider"
import {MatTableModule} from "@angular/material/table"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatSortModule} from "@angular/material/sort"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatNativeDateModule} from "@angular/material/core"
import {MatRadioModule} from "@angular/material/radio"
import {MatCheckboxModule} from "@angular/material/checkbox"
import {MatDialogModule} from "@angular/material/dialog"
import { NewComponent } from './pages/new/new.component';
import { ViewmyComponent } from './pages/viewmy/viewmy.component';
import { UpdatepostComponent } from './pages/updatepost/updatepost.component';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';
import { DialogboxdeleteComponent } from './components/dialogboxdelete/dialogboxdelete.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    EmailverifyComponent,
    LoginComponent,
    FogotpasswordComponent,
    ResetpasswordComponent,
    ViewComponent,
    SidenavComponent,
    NewComponent,
    ViewmyComponent,
    UpdatepostComponent,
    DialogboxComponent,
    DialogboxdeleteComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatBadgeModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
      ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
