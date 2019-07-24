import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { decreaseElementDepthCount } from '@angular/core/src/render3/state';
import { defaultIterableDiffers } from '@angular/core/src/change_detection/change_detection';
@Injectable({
  providedIn: 'root'
})
export class SaveRegService {

  constructor(private http: HttpClient) { }
  //   savereg(fname,sname,address,age,dob,gender,phnbr) {
  //     return this
  //     .http.get('http://localhost:3000/savereg?fname=' + fname + '&sname=' + sname + '&address=' + address + '&age=' + age + '&dob=' + dob + '&gender=' + gender +'&phnbr=' + phnbr);
  // }
  savereg(loginval) {
    const url = 'http://localhost:3000/savereg';
    return this
      .http.post(url, loginval)
  }
  getdetails() {
    return this
      .http.get('http://localhost:3000/getdetail');
  }
  //   deleted(patient_id) {
  //     return this
  //     .http.get('http://localhost:3000/deleteuser?user_id=' + patient_id);
  //   }
  deleted(patient_id) {

    const url = 'http://localhost:3000/deleteuser';
    const obj = {
      user_id: patient_id
    };
    return this
      .http.post(url, obj);
  }

  editreg(patient_id) {
    return this
      .http.get('http://localhost:3000/editlist?user_id='+patient_id)
  }
  update(obj) {
    const url = 'http://localhost:3000/editlist';
    return this
      .http.post(url, obj);
  }
  search(newval) {
    return this
      .http.get('http://localhost:3000/search?newval='+newval);
  }
  saveservice(obj) {
    const url = 'http://localhost:3000/login';
    return this
      .http.post(url, obj);
  }
  tempappc(obj) {
    const url = 'http://localhost:3000/tempappointment';
    return this
      .http.post(url, obj);
  }

  specdisplay() {
    return this
      .http.get('http://localhost:3000/specdis');
  }
  docdisplay(dept_id) {
    return this
      .http.get('http://localhost:3000/docnm?dept_id='+dept_id);
  }
  appc(obj) {
    const url = 'http://localhost:3000/appointment';
    return this
      .http.post(url, obj);
  }
  getapp() {
    return this
      .http.get('http://localhost:3000/getapp');
  }


}