
import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/userservice/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { ToastrService } from 'ngx-toastr';
import { WebsocketService } from 'src/app/service/postservice/websocket.service';

@Component({
  selector: 'app-menubar',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  badgevisible = true;
  notifications: string[] = [];


  constructor(private auth: AuthService,private router: Router,private _snackBar:MatSnackBar,private dialog: MatDialog,private toastr:ToastrService,private websocketService: WebsocketService

    
  ) { }

  ngOnInit(): void {
    this.loadNotifications();
    this.websocketService.initializeWebSocketConnection();
    this.websocketService.subscribe('/topic/new-post', (message: any) => {
      this.notifications.push(message);
      this.saveNotifications();
      this.badgevisible = true;
    });
  }
 
  loadNotifications() {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
      this.badgevisible = this.notifications.length >=0;
    }
  }

  saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  clearNotification() {
    if (this.notifications.length > 0) {
      const notificationList = this.notifications.join('<br>');
      this.toastr.info(notificationList, 'Notifications', { timeOut: 0, enableHtml: true});
      this.notifications = [];
      this.saveNotifications();
      this.badgevisible = true;
    }
  }

  logout() {
    const dialogRef = this.dialog.open(DialogboxComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.auth.logout();
        this.router.navigate(['/login']);
        this.toastr.success('Logout Successfully');}
    });
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }
}
