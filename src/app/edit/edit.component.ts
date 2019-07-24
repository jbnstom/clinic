import { Component, OnInit } from '@angular/core';
import{SaveRegService } from '../save-reg.service';
import{ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editList;
  updateList;
  registrationList;
  patient_id$: Object;
  
  constructor(private edit:SaveRegService, private route: ActivatedRoute, private router: Router ) {
    this.route.params.subscribe(params=> this.patient_id$=params.patient_id);
  }

  ngOnInit() {
    this.edit.editreg(this.patient_id$).subscribe((data:any[])=>{
      this.editList=data[0];
    });
  }
  updatereg(){
    this.updateList={
      patient_id:this.patient_id$,
      fname:this.editList.fname,
      sname:this.editList.sname,
      address:this.editList.address,
      age:this.editList.age,
      dob:this.editList.dob,
      gender:this.editList.gender,
      phnbr:this.editList.phnbr
    }
  
  this.edit.update(this.updateList).subscribe((data:any[])=>{
    alert("Updated Successfully");
    this.router.navigateByUrl('/ViewReg');
  }
);
  }
  keyPress1(event: any) {
    const pattern = /[A-Za-z\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
