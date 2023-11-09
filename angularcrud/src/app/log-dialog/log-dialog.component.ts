import { Component,EventEmitter,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-log-dialog',
  templateUrl: './log-dialog.component.html',
  styleUrls: ['./log-dialog.component.css'], 
})
export class LogDialogComponent {
  hide = true;
  loginForm!: FormGroup;
  correctEmail: string = 'abc';
  correctPassword: string = '123';
  correct:boolean=false;

  actionbutton = 'login';
 email:any;
//   password: string | undefined='' ;
 
  
 
  constructor(private formBuilder : FormBuilder,
    public dialogRef: MatDialogRef<LogDialogComponent>,
    private _snackBar: MatSnackBar,private api: ApiService){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
// login(){
// alert('login succesful')
// this.isLoggedIn=true
// }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000, 
    });
  }
  
  login(){
  if(this.loginForm.valid){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // console.log(this.loginForm.value)
    this.api.login(email,password).subscribe((res:any)=> {
      if(res.message=="Login successful"){
        this.correct=true; 
        this.correct=true; 
        this.openSnackBar('Login successful', 'OK');
        setTimeout(() => {
      this.dialogRef.close('login');
        }, 0);
      }else{
        this.openSnackBar('Enter Correct Password', 'OK');
      }
    }
     
      // {
      // console.log("success",res);
      // this.correct=true; 
      // this.openSnackBar('Login successful', 'OK');
      // setTimeout(() => {
      // this.dialogRef.close('login');
      //   }, 0);
      // },
      // (error)=>{
      // console.error("error in login",error);
      // this.openSnackBar('Enter Correct Password', 'OK');
      // }

     )


   }
   }
  
 }

function output(): (target: LogDialogComponent, propertyKey: "childEvent") => void {
  throw new Error('Function not implemented.');
}

