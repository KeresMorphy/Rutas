// seller-detail-modal.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seller-detail-modal',
  templateUrl: './seller-detail-modal.component.html',
  styleUrls: ['./seller-detail-modal.component.scss'],
})
export class SellerDetailModalComponent implements OnInit {
  @Input() client: any;
  selectedDay: string = '';

  constructor(private modalController: ModalController, private alertController: AlertController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss(); // Cierra el modal
  }

  selectDay(day: string) {
    if (this.selectedDay === day) {
      // Si el día ya está seleccionado, deselecciónalo
      this.selectedDay = '';
    } else {
      // Si se selecciona un nuevo día, deselecciona el día anterior y selecciona el nuevo
      this.selectedDay = day;
    }
  }
  async confirmAssignment() {
    if (this.selectedDay) {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: `¿Estás seguro que quieres asignar al día ${this.selectedDay}?`,
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
              this.closeModal();
              console.log(`Asignado al día ${this.selectedDay}`);
            },
          },
        ],
      });

      await alert.present();
    } else {
      console.log('Por favor, selecciona un día antes de asignar.');
    }
  }
  isSelected(day: string): boolean {
    return this.selectedDay === day;
  }
}
