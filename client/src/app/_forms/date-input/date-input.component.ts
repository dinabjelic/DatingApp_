import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label:string;
  @Input() maxDate: Date; //da bismo ogranicili datePicker da ne bude ispod 18 godina user

   //svaki properti unutar ovog tipa ce biti opcionalan, ne moramo zasebno praviti konfiguracijske postavke
   //bez njega bismo morali svaku mogucu konfiguraciju rucno pisat
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl:NgControl) {
    this.ngControl.valueAccessor=this;
    this.bsConfig={
      containerClass: 'theme-red', 
      dateInputFormat: 'DD MMMM YYYY'

    }

   }

   get control(){   
    return this.ngControl.control as FormControl
 }


  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
}


