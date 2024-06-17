
import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/userservice/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menubar',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
  constructor(private auth: AuthService,private router: Router,private _snackBar:MatSnackBar,private dialog: MatDialog,private toastr:ToastrService
  ) { }


  logout() {
    const dialogRef = this.dialog.open(DialogboxComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.auth.logout();
        this.router.navigate(['/login']);
        this.toastr.success('Logout Successfully');}
    });
  }
}
