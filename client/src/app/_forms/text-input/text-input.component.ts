import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
//umjesto da implementiramo OnInit, uzeli smo ControlValueAccessor koji stvara most izmedju native elemenata u DOMu
//a to je formControl='username' i angulara
export class TextInputComponent implements ControlValueAccessor {

  //dodajemo input propertije i ono sto cemo pass throug je label i type
  @Input() label:string; 
  @Input() type = 'text'; 
  
  // FormControlDirective.form: FormControl


  //moramo injectati control unutar konstruktora te komponente 
  //self omogucava da angular ne ubacuje svoje komponente nego cemo se ogranicit samo na inpute
  //NgControl je bazna klasa 
  //i dodavanjem ovog smo dobili pristup kontrolama unutar komponente koju koristimo unutar register forme
  constructor(@Self() public ngControl:NgControl) 
  {
    this.ngControl.valueAccessor=this;
  }

 get control(){   //ovo smo napravili da bismo getali FormControl koja se koristi u htmlu
    return this.ngControl.control as FormControl
 }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }
  

 
}
