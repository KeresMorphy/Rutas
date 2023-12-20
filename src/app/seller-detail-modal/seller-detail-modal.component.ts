import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SellersService } from '../services/sellers.service';  // Asegúrate de ajustar la ruta correcta
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
    private sellersService: SellersService // Inyecta el servicio SellersService
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss(); // Cierra el modal
  }

  selectDay(day: string) {
    const index = this.selectedDays.indexOf(day);

    if (index !== -1) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
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
            handler: () => {
              this.createClienteInfo(); // Llama a la función para enviar los datos al backend
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

  createClienteInfo() {
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
      Visitado: false, // No estoy seguro de dónde obtener este valor
    };

    // Utiliza el servicio para realizar la solicitud POST al backend Laravel
    this.sellersService.createClienteInfo(postData).subscribe(
      (response) => {
        console.log('Cliente creado exitosamente', response);
      },
      (error) => {
        console.error('Error al crear cliente', error);
      }
    );
  }
}
