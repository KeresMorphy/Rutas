// sellers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  private apiUrl = 'http://201.159.34.30:9295/bonnacarne-api/public/api';

  constructor(private http: HttpClient) { }

  getAllSellers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sellers/all`);
  }

  getClientsBySeller(codAgen: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sellers/${codAgen}`);
  }
  createClienteInfo(data: any): Observable<any> {
    return this.http.post<any>('http://201.159.34.30:9295/bonnacarne-api/public/api/crear-cliente-info', data);
  }
  getClientesInfoByDay(ruta: string): Observable<any> {
    const url = `${this.apiUrl}/getClientesInfoByDay/${ruta}`;
    return this.http.get<any>(url);
  }
  editarNoVisitado(idCliente: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/clientes/${idCliente}/editar-no-visitado`;
    return this.http.put<any>(url, data);
  }
}
