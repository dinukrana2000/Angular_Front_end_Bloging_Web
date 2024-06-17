import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmyComponent } from './viewmy.component';

describe('ViewmyComponent', () => {
  let component: ViewmyComponent;
  let fixture: ComponentFixture<ViewmyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewmyComponent]
    });
    fixture = TestBed.createComponent(ViewmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
