import { Component, Output,EventEmitter } from '@angular/core';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-color-mode',
  templateUrl: './color-mode.component.html',
  styleUrls: ['./color-mode.component.css']
})
export class ColorModeComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  @Output() toggleColor=new EventEmitter<boolean>();

  onToggleChange(event:any){
    this.checked=event.checked;
    this.toggleColor.emit(this.checked);
  }
}
