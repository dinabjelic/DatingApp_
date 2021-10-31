import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  loggedIn:any;
  // currentUser$: Observable<User>; 
  
  
  constructor(private accountService: AccountService, private router:Router, private toastr:ToastrService) { }
  
  ngOnInit(): void {
    this.getCurrentUser(); //i ovo smo dodali sad 
  }
  
  login() {
    this.accountService.login(this.model).subscribe(response=>
      {
        this.loggedIn=true;
        this.router.navigateByUrl('/members');
      },error=>{
        console.log(error);
        this.toastr.error(error.error);
      })
  }
  logout(){
    this.accountService.logout();  //ovo smo dodali sad
    this.loggedIn=false;
    this.router.navigateByUrl('/');
  }


  //i ovo isto 
  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user=>{
      this.loggedIn= !!user; 
    }, error=>{
      console.log(error);
    })
  }

}
