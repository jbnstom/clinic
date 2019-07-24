import { Component, OnInit } from '@angular/core';
import { SaveRegService } from '../save-reg.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  objsave={};
  constructor(private logins:SaveRegService, private router: Router) { }
    
  login(username,password){

      this.objsave={
        uname:username,
        pswd:password
      };
      
      this.logins.saveservice(this.objsave).subscribe((data:any[])=>{
          alert("login successful")
          this.router.navigateByUrl('/all');
        });
    }
    

    ngOnInit(){
    }


    keyPress(event: any) {
      const pattern = /[A-Za-z\+\-\ ]/;
  
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }