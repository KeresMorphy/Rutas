// sellers-clients.page.ts
import { Component, OnInit } from '@angular/core';
import { SellersService } from '../services/sellers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sellers-clients',
  templateUrl: './sellers-clients.page.html',
  styleUrls: ['./sellers-clients.page.scss'],
})
export class SellersClientsPage implements OnInit {
  sellers: any[""]; // arreglo que contendrá los vendedores
  selectedSeller: any; // vendedor seleccionado
  clients!: any[]; // arreglo que contendrá los clientes asociados al vendedor seleccionado
  seller: any;
  constructor(private sellersService: SellersService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const codAgen = params['codAgen']; // Obtén el valor de codAgen de los parámetros de la ruta
      this.loadClients(codAgen);
    });
  }

 

  irAMapa() {
    this.router.navigate(['/mapa']);
  }

  private loadClients(codAgen: string) {
    this.sellersService.getClientsBySeller(codAgen).subscribe(
      (data) => {
        this.clients = data.clients; // Asigna los clientes asociados al vendedor seleccionado
        this.seller = data.seller;
        console.log(this.clients);
      },
      (error) => {
        console.error('Error al obtener clientes', error);
      }
    );
  }
}
