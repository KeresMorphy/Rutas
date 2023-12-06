// sellers-clients.page.ts
import { Component, OnInit } from '@angular/core';
import { SellersService } from '../services/sellers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sellers-clients',
  templateUrl: './sellers-clients.page.html',
  styleUrls: ['./sellers-clients.page.scss'],
})
export class SellersClientsPage implements OnInit {
  sellers: any[""]; // arreglo que contendrá los vendedores
  selectedSeller: any; // vendedor seleccionado
  clients: any[""]; // arreglo que contendrá los clientes asociados al vendedor seleccionado

  constructor(private sellersService: SellersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadSellers();
  }

  private loadSellers() {
    this.sellersService.getAllSellers().subscribe(
      (data) => {
        this.sellers = data; // asigna los datos del servicio al arreglo de vendedores
      },
      (error) => {
        console.error('Error al obtener vendedores', error);
      }
    );
  }

  onSelectSeller(seller: any) {
    this.selectedSeller = seller;
    this.loadClients(seller.CodAgen);
  }

  private loadClients(codAgen: string) {
    this.sellersService.getClientsBySeller(codAgen).subscribe(
      (data) => {
        this.clients = data.clients; // asigna los clientes asociados al vendedor seleccionado
      },
      (error) => {
        console.error('Error al obtener clientes', error);
      }
    );
  }
}
