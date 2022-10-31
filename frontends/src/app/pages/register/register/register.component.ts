import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/interfaces/users/student';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  isSubmitted= false
  errorMsg=''
  registerForm  = new FormGroup({
    // name : new FormControl("",[Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
    userName : new FormControl("",[Validators.required]),
    email : new FormControl("",[Validators.required , Validators.email]),
    password : new FormControl("",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
  })
  
  constructor(private _auth:DataService , private _router:Router) { }

  ngOnInit(): void {
  }
  get userName(){return this.registerForm.get('userName')}
  get email(){return this.registerForm.get('email')}
  get password(){return this.registerForm.get('password')}
  // msg=''
  handleRegister(){
      // console.log(this.registerForm.value)
      let data : Student|any = this.registerForm.value
      this.isSubmitted=true
      if(this.registerForm.valid){
        this._auth.register(data).subscribe(
          res=>{
            console.log(res)
          },
          e=>{
            console.log(e)
            console.log(e.error.message)
            this.errorMsg=e.error.message
          },
          ()=>{
            console.log("finished")
            // this._router.navigate(['/login'])
            this._router.navigateByUrl('/login')
          }
        )
      }
}}