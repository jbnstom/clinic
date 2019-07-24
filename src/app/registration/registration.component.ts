import { Component, OnInit } from '@angular/core';
import { SaveRegService } from '../save-reg.service';
import { SafeHtml } from '@angular/platform-browser';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private service1: SaveRegService) { }
  fname;
  sname;
  address;
  age;
  dob;
  gender;
  phnbr;
  loginval;
  ngOnInit() {
  }
  savereg(fname, sname, address, age, dob, gender, phnbr) {
  if(!fname){
  alert("Enter first name");
  } else if(!gender){
    alert("Choose Gender");
  } else if(!phnbr){
    alert("Enter phone number");
  } else if(age<1 || age>100){
    alert("The age must be a number between 1 and 100");
  } else{

  
    this.loginval = {
      fname: fname,
      sname: sname,
      address: address,
      age: age,
      dob: dob,
      gender: gender,
      phnbr: phnbr
    }
    this.service1.savereg(this.loginval).subscribe((data: any[]) => {
      alert("inserted");
      this.fname=null;
      this.sname=null;
      this.address=null;
      this.age=null;
      this.dob=null;
      this.gender=null;
      this.phnbr=null;
    });

    // this.val.savereg(fname,sname,address,age,dob,gender,phnbr).subscribe((data: any[]) => {
    //   if (data.length > 0) {
    //     alert("Data inserted successfully");
    //   } else {
    //     alert("Empty set");
    //   }
    // });
    
  }
}

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPress1(event: any) {
    const pattern = /[A-Za-z\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
