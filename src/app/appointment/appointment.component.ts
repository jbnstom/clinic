import { Component, OnInit } from '@angular/core';
import { SaveRegService } from '../save-reg.service';
import{ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  deptname;
  docname;
  token;
  shoWToken;
  shoAppointment;
  patient_id$: Object;
  constructor(private service5: SaveRegService, private route: ActivatedRoute, private router: Router ) {
    this.route.params.subscribe(params=> this.patient_id$=params.patient_id);
   }
  special;
  doc;
  date;
  objdata;
  
  docdisplay(depart_id){
    this.service5.docdisplay(depart_id).subscribe((data: any[]) => {
      this.docname = data;
      this.doc="";
    });
  }
 

  ngOnInit() {
    this.service5.specdisplay().subscribe((data: any[]) => {
      this.deptname = data;
      this.special="";
    });
    this.shoWToken=true;
    this.shoAppointment=false;
  }

  Temp_appc(spec, doc, date) {
    this.objdata = {
      patient_id:this.patient_id$,
      spec: this.special,
      doc: doc,
      date: date,
    }

    this.service5.tempappc(this.objdata).subscribe((data: any[]) => {
      alert("Token Generated");
      this.token=data[0].temp_tokenno;
      this.shoWToken=false;
      this.shoAppointment=true;
    });


  }

  appc(spec, doc, date) {
    this.objdata = {
      patient_id:this.patient_id$,
      spec: this.special,
      doc: doc,
      date: date,
      token:this.token
    }

    this.service5.appc(this.objdata).subscribe((data: any[]) => {
      if(data[0].ActionValue=='Insert'){
        alert('Booked successfully !. Token No '+this.token);
      }
      else if(data[0].ActionValue=='NotInserted'){
        alert('Not Booked. Re-Generate Token !');
        this.shoWToken=true;
        this.shoAppointment=false;
      }
    });
  }
}
