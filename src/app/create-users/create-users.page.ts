import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.page.html',
  styleUrls: ['./create-users.page.scss'],
})
export class CreateUsersPage implements OnInit {
  createUserForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router 
  ) {
    this.createUserForm = this.formBuilder.group({
      CodigoAgente: ['', Validators.required],
      Nombre: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      NumeroEmpleado: ['', Validators.required],
      Contrasena: ['', Validators.required],
      Rol: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.createUserForm.valid) {
      const userData = this.createUserForm.value;

      // Mostrar el loader mientras se crea el usuario
      const loading = await this.loadingController.create({
        message: 'Creando usuario...',
      });
      await loading.present();

      this.authService.createUser(userData).subscribe(
        (response) => {
          console.log('Usuario creado con éxito', response);
          // Ocultar el loader después de la creación exitosa
          loading.dismiss();

          // Mostrar alerta de éxito y restablecer los campos del formulario
          this.presentSuccessAlert();
        },
        (error) => {
          console.error('Error al crear usuario', error);
          // Ocultar el loader en caso de error
          loading.dismiss();

          // Mostrar alerta de error
          this.presentErrorAlert();
        }
      );
    } else {
      console.error('Formulario inválido');
      // Mostrar alerta de que faltan datos en el formulario
      this.presentMissingDataAlert();
    }
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Usuario creado con éxito.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Restablecer los campos del formulario a blanco
            this.createUserForm.reset();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error al crear usuario. Por favor, inténtalo de nuevo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentMissingDataAlert() {
    const alert = await this.alertController.create({
      header: 'Faltan datos',
      message: 'Por favor, completa todos los campos del formulario.',
      buttons: ['OK'],
    });

    await alert.present();
  }
  goToSellers() {
    // Redirigir a la ruta "/sellers"
    this.router.navigate(['/sellers']);
  }
}
