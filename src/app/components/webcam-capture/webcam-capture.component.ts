import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-webcam-capture',
  templateUrl: './webcam-capture.component.html',
  styleUrls: ['./webcam-capture.component.css']
})
export class WebcamCaptureComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  capturedImages: string[] = [];


  ngOnInit(): void {
    this.startWebcam();
  }

  startWebcam(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing webcam: ', error);
      });
  }

  captureImage(): void {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
  
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      // Get the image data URL
      const imageDataUrl = canvas.toDataURL('image/png');
      this.capturedImages.push(imageDataUrl);
      console.log(this.capturedImages);
    }
    
  }

  
}
