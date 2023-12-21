import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { SellersService } from '../services/sellers.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  userInfo: any;
  employee_number: string | undefined;
  name: string | undefined;
  name2: string | undefined;
  arrayCustomers: Array<any> = [];
  daySelected: string | undefined;
  currentDay: string | undefined;
  currentWeekday: any;
  currentVisit: any;
  arrayWeekdays: Array<any> = [];
  itsRouteStarted: string = 'not-started';
  longitude: any;
  latitude: any;
  userData: any;
  email: string | undefined;
  form: FormGroup | undefined;
  clientes: Array<any> = [];

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private sellersService: SellersService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {
    this.formInit();
    this.userInfo = localStorage.getItem('userData');
    this.userInfo = JSON.parse(this.userInfo);
    console.log(this.userInfo);
    this.name2 = this.userInfo.name;
    console.log(this.name2);

    this.getLocation();
  }

  ionViewDidEnter() {
    this.employee_number = localStorage.getItem('employee_number') || undefined;
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  formInit() {
    this.form = this.formBuilder.group({
      employee_number: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')],
      ],
    });
  }

  irAMapa(cliente: any) {
    // Utiliza NavParams para pasar datos a la página del mapa
    this.router.navigate(['/mapa'], {
      state: { cliente: cliente }
    });
  }

  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes() {
    const ruta = '322.0'; // Reemplaza esto con la ruta que necesitas obtener
    this.sellersService.getClientesInfoByDay(ruta).subscribe(
      (data) => {
        // La respuesta de la API se encuentra en 'data'
        console.log(data);
        // Actualiza tu arreglo de clientes con los datos obtenidos
        this.clientes = data.clientes || [];
      },
      (error) => {
        console.error('Error al obtener datos de la API', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }
  // Aquí puedes agregar las funciones adicionales que necesitas
}
