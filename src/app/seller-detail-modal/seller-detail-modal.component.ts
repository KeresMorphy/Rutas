import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { SellersService } from '../services/sellers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seller-detail-modal',
  templateUrl: './seller-detail-modal.component.html',
  styleUrls: ['./seller-detail-modal.component.scss'],
})
export class SellerDetailModalComponent implements OnInit {
  @Input() client: any;
  selectedDays: string[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private sellersService: SellersService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
    window.location.reload();
  }

  selectDay(day: string) {
    const index = this.selectedDays.indexOf(day);

    if (index !== -1) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }
  }

  async presentLoader() {
    const loader = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent',
    });
    await loader.present();
    return loader;
  }

  async dismissLoader(loader: HTMLIonLoadingElement) {
    if (loader) {
      await loader.dismiss();
    }
  }

  async confirmAssignment() {
    if (this.selectedDays.length > 0) {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: `¿Estás seguro que quieres asignar a los días ${this.selectedDays.join(', ')}?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Asignación cancelada');
            },
          },
          {
            text: 'Aceptar',
            handler: async () => {
              const loader = await this.presentLoader();
              this.createClienteInfo(loader);
            },
          },
        ],
      });

      await alert.present();
    } else {
      console.log('Por favor, selecciona al menos un día antes de asignar.');
    }
  }

  isSelected(day: string): boolean {
    return this.selectedDays.includes(day);
  }

  createClienteInfo(loader: HTMLIonLoadingElement) {
    const postData = {
      CodCliente: this.client.CodCliente,
      CodPostal: this.client.CodPostal,
      Colonia: this.client.Colonia,
      Domicilio: this.client.Domicilio,
      Email: this.client.Email,
      Estado: this.client.Estado,
      NoExterior: this.client.NoExterior,
      Poblacion: this.client.Poblacion,
      RazonSocial: this.client.RazonSocial,
      Ruta: this.client.Ruta,
      Telefono: this.client.Telefono,
      FechaAsignacion: new Date().toISOString().split('T')[0],
      Lunes: this.isSelected('Lunes'),
      Martes: this.isSelected('Martes'),
      Miercoles: this.isSelected('Miércoles'),
      Jueves: this.isSelected('Jueves'),
      Viernes: this.isSelected('Viernes'),
      Sabado: this.isSelected('Sábado'),
      Visitado: false,
    };

    this.sellersService.createClienteInfo(postData).subscribe(
      (response) => {
        console.log('Cliente creado exitosamente', response);
        this.dismissLoader(loader);
        this.closeModal();
      },
      (error) => {
        console.error('Error al crear cliente', error);
        this.dismissLoader(loader);
      }
    );
  }
}
