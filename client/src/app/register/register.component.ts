import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model:any={};
registerForm:FormGroup;

  constructor(private accountService:AccountService,private toastr:ToastrService,private fb:FormBuilder, 
    private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }


  initializeForm(){
    this.registerForm= this.fb.group({
      username:['', Validators.required], 
      gender:['male'], 
      knownAs:['', Validators.required], 
      dateOfBirth:['', Validators.required], 
      city:['', Validators.required], 
      country:['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]], 
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]

    })
    //ono o cemu trebamo mislit je da kad se updateuje/promijeni passsword da se mora promijenit i confirmPassword
     
    this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

    matchValues(matchTo: string):ValidatorFn{
      //zasto abstract, zato sto sve formControls dolaze od abstract
      return(control: AbstractControl) =>{
        return control.value=== control?.parent?.controls[matchTo].value ? null : {isMatching:true}
      }
    }

  register(){
    //ne primamo vise od modela this.model nego od forme za registraciju 
    this.accountService.register(this.registerForm.value).subscribe(response=>{
     this.router.navigateByUrl('/members'); //ova linija nam znaci da nas odvede odmah gdje su membersi kad se registrujemo      
    },error=>{
      console.log(error);
      this.toastr.error(error.error); // ne treba nam to jer ce to doc od intereceptora 
    })
  }

  cancel(){
    console.log("canceled");
  }

}
