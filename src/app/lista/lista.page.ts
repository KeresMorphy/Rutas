import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavParams } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { SellersService } from '../services/sellers.service';
import { ProductService } from '../services/product.service';

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
product: any;
  products: any[] = [];
  filteredProducts: any[] = [];
  ruta!: string;
  hayClientes: boolean = false;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private productService: ProductService,
    private sellersService: SellersService,
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {
    this.formInit();
    this.userInfo = localStorage.getItem('userData');
    this.userInfo = JSON.parse(this.userInfo);
    console.log(this.userInfo);
    this.name2 = this.userInfo.name;
    this.ruta = this.userInfo.id_cedis;

    console.log(this.name2);
    console.log(this.ruta);

    this.getLocation();
  }

  ionViewDidEnter() {
    this.employee_number = localStorage.getItem('employee_number') || undefined;
    this.obtenerClientes(); // Llamada al servicio de clientes
  
    // Muestra el loader antes de llamar al servicio de productos
    this.presentLoader();
  
    // Llama al servicio de productos y muestra el loader
    this.productService.getAllProducts().subscribe(
      (data) => {
        // La respuesta de la API de productos se encuentra en 'data'
       
        // Actualiza tu arreglo de productos con los datos obtenidos
        this.products = data || [];
        console.log(this.products);
        // Cierra el loader después de obtener los datos con éxito
        this.dismissLoader();
      },
      (error) => {
        console.error('Error al obtener datos de la API de productos', error);
        // Puedes manejar el error según tus necesidades
        // Cierra el loader en caso de error
        this.dismissLoader();
      }
    );
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
  
  }
  
  private async presentLoader(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cargando Clientes...' // Mensaje que se mostrará en el loader
    });
    await loading.present();
  }
  
  private async dismissLoader(): Promise<void> {
    if (this.loadingController) {
      await this.loadingController.dismiss();
    }
  }
  

  obtenerClientes() {
    this.sellersService.getClientesInfoByDay(this.ruta + '.0').subscribe(
      (data) => {
        console.log(data);
        this.clientes = data.clientes || [];
        this.hayClientes = this.clientes.length > 0;
      },
      (error) => {
        console.error('Error al obtener datos de la API', error);
        this.hayClientes = false;
      }
    );
  }
}
