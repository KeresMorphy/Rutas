import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';
import { SellersService } from '../services/sellers.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.page.html',
  styleUrls: ['./sellers.page.scss'],
})
export class SellersPage implements OnInit {
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
  vendedores: any[] = [];
  totalVendedores: number = 0;
  
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

  
  loadSellers() {
    this.sellersService.getAllSellers().subscribe(
      (data) => {
        this.vendedores = data;
        console.log(this.vendedores);
        this.totalVendedores = this.vendedores.length;
      },
      (error) => {
        console.error('Error al cargar vendedores', error);
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

  irAMapa(codAgen: string) {
    this.router.navigate(['/sellers-clients', codAgen]);
  }

  ngOnInit() {
    this.loadSellers();
  }

  goToCreateUser() {
    
    this.router.navigate(['/create-users']);
  }
  goToCreateCliente() {
    this.router.navigate(['/alta-cliente']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  
  // Aquí puedes agregar las funciones adicionales que necesitas
}
