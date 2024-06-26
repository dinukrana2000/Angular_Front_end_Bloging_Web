import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamCaptureComponent } from './webcam-capture.component';

describe('WebcamCaptureComponent', () => {
  let component: WebcamCaptureComponent;
  let fixture: ComponentFixture<WebcamCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebcamCaptureComponent]
    });
    fixture = TestBed.createComponent(WebcamCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
