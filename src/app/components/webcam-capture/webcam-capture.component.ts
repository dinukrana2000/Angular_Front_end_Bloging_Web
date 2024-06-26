import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-webcam-capture',
  templateUrl: './webcam-capture.component.html',
  styleUrls: ['./webcam-capture.component.css']
})
export class WebcamCaptureComponent implements OnInit {
  //@ViewChild used to access the element with the template reference variable
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  //base64 strings of captured images
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
    //Retrieves the native video element from the videoElement property.
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    //Gets the 2D rendering context of the canvas, which is used for drawing the captured image from the video.
    const context = canvas.getContext('2d');
  
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      //drawImage() method draws the current frame of the video on the canvas.
      //top left corner to entire canvas width and height
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      // Get the image data URL
      const imageDataUrl = canvas.toDataURL('image/png');
      this.capturedImages.push(imageDataUrl);
      console.log(this.capturedImages);
    }
    
  }

  
}
