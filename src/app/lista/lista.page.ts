import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  clientes = [
    { nombre: 'Cliente 1', detalles: 'soy un cliente ' },
    { nombre: 'Cliente 2', detalles: 'soy otro clienbte' },
    { nombre: 'Cliente 3', detalles: 'Detalles d' },
  ];

  // Inyecta el servicio Router en el constructor
  constructor(private router: Router) { }

  irAMapa() {
    this.router.navigate(['/mapa']);
  }


  ngOnInit() {
  }
}
