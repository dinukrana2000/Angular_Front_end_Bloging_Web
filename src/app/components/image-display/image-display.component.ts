import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent {
  @Input() imageDataUrls: string[]=[];

  constructor() { }

  DownloadImage(imageDataUrl: string): void {
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'image.png';
    link.click();
  }

}
