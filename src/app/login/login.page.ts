import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { ComponentsService } from '../services/components.service';
import { NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;

  constructor(
    public formBuilder: FormBuilder, 
    private authService: AuthService,
    private componentsService: ComponentsService,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.formInit();
  }

  ngOnInit() {
    this.authService.isLogged = false;
      sessionStorage.clear();
      localStorage.clear();
  }

  formInit() {
    this.form = this.formBuilder.group({
      employee_number: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  login() {
    this.componentsService.loading(1000);
    this.authService.login(
      this.form.controls['employee_number'].value.toString(),
      this.form.controls['password'].value
    ).subscribe(
      (res: any) => {
        localStorage.setItem('employee_number', res.employee_number);
        if (res.token) localStorage.setItem('token', res.token);
        localStorage.setItem('userData', JSON.stringify({
          employee_number: res.employee_number,
          role: res.role,  // Agrega el rol a la información del usuario
          name: res.name ,
          id_cedis: res.id_cedis ,
          empleado: res.empleado


        }));
        
        this.form.setValue({
          employee_number: '',
          password: ''
        });
  
        // Verifica el rol y redirige según corresponda
        if (res.role === 'Admin') {
          this.router.navigate(['/sellers']);
        } else if (res.role === 'Vendedor') {
          this.router.navigate(['/lista']);
        }
  
        this.authService.isLogged = true;
        console.log("Logeado");
      },
      err => {
        console.error(err);
        this.form.setValue({
          employee_number: '',
          password: ''
        });
        this.componentsService.alert('Error al iniciar sesión', '', err.error.error);
      }
    );
  }
  
  

  cleanMemory(){
    sessionStorage.clear();
    localStorage.clear();

    this.componentsService.alert('Memoria interna de la aplicacion limpiada', '', '');
  }


}
