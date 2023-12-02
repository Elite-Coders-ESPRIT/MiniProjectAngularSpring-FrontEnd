import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwilioServiceService {
  private twilioSid = 'AC2eb2c8a866ca28cc41a4c86e365022d4';
  private twilioToken = '7e4d1f853a4e48a36a67a2bb4963948a';
  private twilioPhoneNumber = '+17067527070';
  constructor(private http: HttpClient) { }

  sendSMS(to: string, body: string) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${this.twilioSid}/Messages.json`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.twilioSid}:${this.twilioToken}`)
    });

    const payload = {
      To: to,
      From: this.twilioPhoneNumber,
      Body: body
    };

    const formData = new URLSearchParams();
    for (const key in payload) {
      formData.set(key, payload[key]);
    }

    return this.http.post(url, formData.toString(), { headers });
  }
}
