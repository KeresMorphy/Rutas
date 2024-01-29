import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage {
  formData = {
    CodCliente: '',
    RazonSocial: '',
    Domicilio: '',
    NoExterior: '',
    Ruta: '',
    colonia: '',
    Poblacion: '',
    Estado: '',
    Telefono: '',
    CodPostal: '',
    RFC: '',
    Email: '',
    FormaPago: '',
    UsoCFDI: '',
    EnviadoTaz: '',
  };

  constructor(private http: HttpClient,
    private router: Router ) {}

  submitForm() {
    // Realiza la solicitud HTTP aquí
    this.http.post('http://201.159.34.30:9295/bonnacarne-api/public/api/alta-clientes', this.formData)
      .subscribe(response => {
        console.log('Respuesta del servidor:', response);
        // Puedes manejar la respuesta del servidor aquí
      }, error => {
        console.error('Error al enviar la solicitud:', error);
        // Puedes manejar errores aquí
      });
  }
  goToSellers() {
    // Redirigir a la ruta "/sellers"
    this.router.navigate(['/sellers']);
  }
}
