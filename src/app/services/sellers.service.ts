import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  private apiUrl = 'http://201.159.34.30:9295/bonnacarne-api/public/api/sellers/all';

  constructor(private http: HttpClient) { }

  getAllSellers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
