import { Component, OnInit } from '@angular/core';
import { SaveRegService } from '../save-reg.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  registrationList;

  constructor(private view1: SaveRegService) {
  }
  search123(searchVal) {
    var newVal = searchVal.trim();
    if (newVal.length == 0) {
      this.view1.getdetails().subscribe((data: any[]) => {
        this.registrationList = data;
      });
    } else if (newVal.length > 0) {
      this.view1.search(newVal).subscribe((data: any[]) => {
        this.registrationList = data;
    });
  }
}

  ngOnInit() {
    this.view1.getdetails().subscribe((data: any[]) => {

      this.registrationList = data;
    });
  }

  deleted(patient_id) {
    var test=confirm("Do you want to delete?");
    console.log("test");
    if( test == true ) {
      this.view1.deleted(patient_id).subscribe((data: any[]) => {
        alert("Deleted Successfully");
        this.view1.getdetails().subscribe((data: any[]) => {
          this.registrationList = data;
        });
      });
   } else {
    this.view1.getdetails().subscribe((data: any[]) => {
      this.registrationList = data;
    });
   }

  }
}