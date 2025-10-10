import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment'
const API_URL = `${environment.API_URL}/devices`;
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient, private storage: StorageService) { }


  saveDevice(device: any): Observable<any> {
    return this.http.post(`${API_URL}/save`, device);
  }

  deleteDevice(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  getScreenshot(serial: string): Observable<any> {
  return this.http.get(`${API_URL}/screenshot/${serial}`);
}


}
