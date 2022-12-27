import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms'
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  hide: boolean = false;
  constructor(private fb: FormBuilder, private router: Router){}
  ngOnInit(){
    this.loginForm=new FormGroup(
      {
        username: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required,Validators.minLength(5)])
      }
    )
  }
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    if(this.loginForm.value.username=="admin" && this.loginForm.value.password=="admin")
    {
      //console.log(this.loginForm.value)
      console.log("login success");
      
      this.router.navigate(['/search'])
    }
    else{
      console.log("login failed");
    }
    
  }

}
