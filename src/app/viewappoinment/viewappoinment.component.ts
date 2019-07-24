import { Component, OnInit } from '@angular/core';
import { SaveRegService } from '../save-reg.service';
@Component({
  selector: 'app-viewappoinment',
  templateUrl: './viewappoinment.component.html',
  styleUrls: ['./viewappoinment.component.scss']
})
export class ViewappoinmentComponent implements OnInit {
  appointmentlist;
  constructor(private view1: SaveRegService) { }

  ngOnInit() {

    this.view1.getapp().subscribe((data: any[]) => {
      this.appointmentlist = data;

    });
  }

}
