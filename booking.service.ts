import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { profileAffiliate } from '../components/home/model/IprofileDoctor';
import { BookingModel, LatLng } from '../models/booking.model';
import { PatientModel } from '../models/patient.model';
import { AffiliateAvailability } from '../components/home/model/affiliateAvailabilityI';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingModel: BookingModel;

  constructor(
    private http: HttpClient,
  ) {
    this.bookingModel = {};
  }

  saveData() {
    localStorage.setItem('bookingItem', JSON.stringify(this.bookingModel));
  }

  loadData() {
    var value = localStorage.getItem('bookingItem');
    if (value) {
      this.bookingModel = JSON.parse(value);
    }
  }

  eraseData() {
    localStorage.removeItem('bookingItem');
  }

  getDoctorById(params: string) {
    let direccion = environment.api_URL + "affiliate/" + params + "/grouped-services";
    return this.http.get<profileAffiliate>(direccion)
  }

  getAffiliateAvailability(affiliate: string, place: string, date?: any) {
   // http://209.126.64.158:3086/api/v1/affiliate/availability?affiliate=5d24476eea8ebc659106657c&place=5d4ff151b003a417d93d018d&date=2021-12-17T00:00:00-06:00
    let direccion = environment.api_URL + "/affiliate/availability?affiliate=" + affiliate + "&place=" + place + "&date=" + date;
    return this.http.get<AffiliateAvailability>(direccion)
  }

  sendOtp(){
    //let otp = environment.api_URL + "otp/invited-phone" + { cellPhone: cellPhone.replace(/ /g, "") }
    //const body=JSON.stringify(person);
    const body = {cellPhone: '50489854230'}
    return this.http.post(environment.api_URL +  "otp/invited-phone", body)
  }

  checkOtpCode(cellPhone: string, otp: string){
    const body = {cellPhone, otp}
    return this.http.post(environment.api_URL + "otp/validate-invited-phone", body )
  }
}
