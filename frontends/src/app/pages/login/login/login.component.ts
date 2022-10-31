import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/interfaces/users/student';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)

  isSubmitted= false
  errorMsg=''
 loginForm  = new FormGroup({
 
  userName : new FormControl("",[Validators.required]),
  password : new FormControl("",[Validators.required])
 })
 
  constructor(private _auth:DataService , private _router:Router) { }

  ngOnInit(): void {
  }

  get userName(){return this.loginForm.get('userName')}
   get password(){return this.loginForm.get('password')}

  handleLogin(){
     this.isSubmitted=true
    let data : Student|any = this.loginForm.value
     if(this.loginForm.valid){
       this._auth.login(data).subscribe(
        res =>{
          console.log(res)
          localStorage.setItem("store",res.data.token)
          this._auth.isLoggedIn =true
          this._auth.userData= res.data.userData
        },
        e=>{
          console.log(e)
          this.errorMsg=e.error.message
          this._auth.isLoggedIn =false
          this._auth.userData= null
        },
        ()=>{console.log("done")
        // this._router.navigate(['/'])
        this._router.navigateByUrl('/')
      }
       )
     }
       }

}