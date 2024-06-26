import { Component } from '@angular/core';
import { fadeInOutAnimation  } from './Animations/Router-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOutAnimation ]
})
export class AppComponent {
  title = 'dinuk_frontend2';
}
