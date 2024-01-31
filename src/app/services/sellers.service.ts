// sellers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SellersService {
  apiUrl: string = env.API;

  constructor(private http: HttpClient) { }

  getAllSellers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}sellers/all`);
  }

  getClientsBySeller(codAgen: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}sellers/${codAgen}`);
  }
  createClienteInfo(data: any): Observable<any> {
    const url = `${this.apiUrl}crear-cliente-info'`;

    return this.http.post<any>(url, data);
  }
  getClientesInfoByDay(ruta: string): Observable<any> {
    const url = `${this.apiUrl}getClientesInfoByDay/${ruta}`;
    return this.http.get<any>(url);
  }
  editarNoVisitado(idCliente: string, data: any): Observable<any> {
    const url = `${this.apiUrl}clientes/${idCliente}/editar-no-visitado`;
    return this.http.put<any>(url, data);
  }
  getallClientesInfoByDay(ruta: string): Observable<any> {
    const url = `${this.apiUrl}getAllClientesInfoByDay/${ruta}`;
    return this.http.get<any>(url);
  }

  createVentaCompleta(data: any): Observable<any> {
    const url = `${this.apiUrl}create-venta`;
    return this.http.post<any>(url, data);
  }
  editarVisitado(idCliente: string): Observable<any> {
    const url = `${this.apiUrl}clientes/${idCliente}/editar-visitado`;
    const data = {};
    return this.http.put<any>(url, data);
}
}
