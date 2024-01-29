import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import mapboxgl from 'mapbox-gl';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { SellersService } from '../services/sellers.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements AfterViewInit {

  @ViewChild('mapdiv')
  mapdivElement!: ElementRef;

  @ViewChild('kgInput')
  kgInputElement!: ElementRef;

  @ViewChild('volumenInput')
  volumenInputElement!: ElementRef;

  kgValue: number;
  volumenValue: number;
  ventas: { id: any; kg: number; precio: any; precioTotal: number }[] = [];
  totalPrecioTotal: number = 0;
  cliente: any; // Asegúrate de que la variable cliente esté declarada
  product: any;
  id: any;
  private numeroPedido: number = 0;

  products: any[] = []; // Asegúrate de inicializar esta variable con tus productos
  filteredProducts: any[] = [];
  scannedData: any = {};
  nuevosKilogramos: number | undefined;
  empleado: any;
  userInfo: any;
  CodCliente: any;
  constructor(private route: ActivatedRoute,
    private loadingController: LoadingController, private productService: ProductService,
    private sellersService: SellersService,
    private alertController: AlertController,
    private httpClient: HttpClient,
    private router: Router,


  ) {
    this.kgValue = 0;
    this.volumenValue = 0;
    this.scannedData = {};
  }

  ngOnInit() {
    this.userInfo = localStorage.getItem('userData');
    this.userInfo = JSON.parse(this.userInfo);
    this.empleado = this.userInfo.id_cedis;

    console.log(this.empleado);
    this.cliente = history.state.cliente;
    console.log(this.cliente);
    this.CodCliente = history.state.cliente.CodCliente;
    console.log(this.CodCliente);

    this.actualizarMapaConCoordenadas();
    // Muestra el loader antes de llamar al servicio de productos
    this.presentLoader();

    // Llama al servicio de productos y muestra el loader
    this.productService.getAllProducts().subscribe(
      (response) => {
        // Verifica si 'data' es un arreglo antes de asignarlo a 'this.products'
        const data = response.data;
        if (Array.isArray(data)) {
          // Actualiza tu arreglo de productos con los datos obtenidos
          this.products = data;
          console.log(this.products);
        } else {
          console.error('La propiedad "data" en la respuesta de la API de productos no es un arreglo', response);
        }

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

  private async presentLoader(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cargando...' // Mensaje que se mostrará en el loader
    });
    await loading.present();
  }


  private async dismissLoader(): Promise<void> {
    if (this.loadingController) {
      await this.loadingController.dismiss();
    }
  }
  onSearchChange(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.Descripcion.toLowerCase().includes(searchTerm) ||
        product.CodProd.toLowerCase().includes(searchTerm)
    );
  }

  selectProduct(product: any) {
    // Al seleccionar un producto, actualiza el código en scannedData
    this.scannedData.Descripcion = product.Descripcion;
    // Puedes agregar más lógica aquí según tus necesidades

    // También puedes ocultar la lista de resultados si lo deseas
    this.filteredProducts = [];
  }


  private async actualizarMapaConCoordenadas() {
    if (this.cliente && this.cliente.CodPostal && this.cliente.Domicilio) {
        // Convertir el código postal a entero y formatear la dirección
        const codigoPostal = Math.floor(this.cliente.CodPostal);
        const direccionCompleta = `${this.cliente.Domicilio}, ${codigoPostal}`;

        const coordenadas = await this.obtenerCoordenadas(direccionCompleta);

        if (coordenadas.length === 2) {
            this.actualizarMapa(coordenadas);
        } else {
            console.error('No se obtuvieron coordenadas para la dirección:', direccionCompleta);
        }
    }
}
  
  private async obtenerCoordenadas(direccion: string): Promise<number[]> {
    const token = 'pk.eyJ1IjoiZWRkeS1jYXN0bGUiLCJhIjoiY2xwMGIwcGc2MDd0NTJrbWR6d3A0N2R1biJ9.N2PAEfekpGWuCosvT47gcQ'; 
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(direccion)}.json?access_token=${token}`;
  
    try {
      const response: any = await this.httpClient.get(apiUrl).toPromise();
  
      if (response.features && response.features.length > 0) {
        const coordinates = response.features[0].geometry.coordinates;
        console.log('Coordenadas obtenidas:', coordinates);
        return coordinates;  // Devuelve las coordenadas [longitud, latitud]
      } else {
        console.error('No se encontraron coordenadas para la dirección:', direccion);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      return [];
    }
  }
  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWRkeS1jYXN0bGUiLCJhIjoiY2xwMGIwcGc2MDd0NTJrbWR6d3A0N2R1biJ9.N2PAEfekpGWuCosvT47gcQ';

    const map = new mapboxgl.Map({
      container: this.mapdivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });
  }
  async mostrarRazonesNoEntrega() {
    const razones = [
      'Dirección incorrecta',
      'Cliente ausente',
      'No hay acceso al edificio',
      'Otra razón',
    ];

    const alert = await this.alertController.create({
      header: 'Seleccione la razón',
      inputs: razones.map((razon, index) => ({
        name: `razon-${index}`,
        type: 'radio',
        label: razon,
        value: razon,
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            // Enviar la razón seleccionada al servidor
            this.enviarRazonNoEntrega(data);
          },
        },
      ],
    });

    await alert.present();
  }
  async enviarRazonNoEntrega(razon: string) {
    try {
      // Obtiene el ID del cliente (asegúrate de tener acceso a la propiedad 'id')
      const idCliente = this.cliente.id;

      // Realiza la solicitud HTTP al servicio Laravel usando SellersService
      const response = await this.sellersService.editarNoVisitado(idCliente, { NoVisitado: razon }).toPromise();

      // Muestra una alerta con la respuesta del servidor
      this.mostrarAlerta('Éxito', response.message);
      this.router.navigate(['/lista']);

    } catch (error) {
      // Muestra una alerta en caso de error
      this.mostrarAlerta('Error', 'Hubo un problema al enviar la razón de no entrega.');
    }
  }
  agregarVenta() {
    if (this.scannedData.Descripcion && this.nuevosKilogramos) {
      const productoSeleccionado = this.products.find(
        (product) => product.Descripcion === this.scannedData.Descripcion
      );

      if (productoSeleccionado) {
        const precioTotal = productoSeleccionado.Publico * this.nuevosKilogramos;

        this.ventas.push({
          id: productoSeleccionado.CodProd,
          kg: this.nuevosKilogramos,
          precio: productoSeleccionado.Publico,
          precioTotal: precioTotal
        });

        // Restablece el valor del input
        this.scannedData.Descripcion = '';

        // Limpia los kilogramos después de agregar la venta
        this.nuevosKilogramos = 0;

        // Actualiza el totalPrecioTotal
        this.actualizarTotalPrecioTotal();
      } else {
        // Muestra una alerta en lugar de imprimir en la consola
        this.mostrarAlerta('Producto no encontrado', 'Por favor, selecciona un producto válido.');
      }
    } else {
      // Muestra una alerta en lugar de imprimir en la consola
      this.mostrarAlerta('Error', 'Por favor, selecciona un producto y proporciona la cantidad de kilogramos.');
    }
  }
  realizarVenta() {
    if (this.ventas.length > 0) {
      // Incrementa el contador de pedido para el siguiente pedido
      
  
      // Crea el objeto de datos para la solicitud
      const data = {
        Fecha: new Date().toISOString(),
        CodCte: this.CodCliente,
        CodAgen: this.empleado, // Ajusta según tus necesidades
        TotalPzs: this.getTotalKilos(),
        Importe: this.totalPrecioTotal,
        FechaEntrega: new Date().toISOString(),
        Referencia: 'Referencia', // Ajusta según tus necesidades
        ParaCliente: true, // Ajusta según tus necesidades
        productos: this.ventas.map((venta, index) => ({
          NoRenglon: index + 1, // +1 porque los índices comienzan desde 0
          CodProd: venta.id,
          Piezas: venta.kg,
        })),
      };
      console.log('Datos a enviar en el POST:', data);
      // Realiza la solicitud HTTP al servicio Laravel usando ProductService
      this.sellersService.createVentaCompleta(data).subscribe(
        (response) => {
          // Muestra una alerta con la respuesta del servidor
          this.mostrarAlerta('Éxito', response.messages);
  
          // Reinicia el arreglo de ventas y actualiza el totalPrecioTotal
          this.ventas = [];
          this.actualizarTotalPrecioTotal();
  
          // Puedes redirigir a otra página o realizar otras acciones según tus necesidades
          this.router.navigate(['/lista']);
        },
        (error) => {
          // Muestra una alerta en caso de error
          this.mostrarAlerta('Error', 'Hubo un problema al realizar la venta.');
        }
      );
    } else {
      // Muestra una alerta si no hay ventas para realizar
      this.mostrarAlerta('Error', 'No hay ventas para realizar.');
    }
  }
  private getTotalKilos(): number {
    // Calcula el total de kilogramos sumando todas las ventas
    return this.ventas.reduce((total, venta) => total + venta.kg, 0);
  }

  private actualizarTotalPrecioTotal() {
    // Calcula el total sumando todos los precioTotal de las ventas
    this.totalPrecioTotal = this.ventas.reduce((total, venta) => total + venta.precioTotal, 0);
  }
  
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  

 
  
  private actualizarMapa(coordenadas: number[]) {
    if (coordenadas.length === 2) {
      // Obtén la instancia del mapa y actualiza su centro y zoom
      const map = new mapboxgl.Map({
        container: this.mapdivElement.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [coordenadas[0], coordenadas[1]],
        zoom: 14,  // Puedes ajustar el nivel de zoom según tus preferencias
      });
  
      // Añade un marcador en las coordenadas
      new mapboxgl.Marker().setLngLat([coordenadas[0], coordenadas[1]]).addTo(map);
    } else {
      console.error('Error: Coordenadas incompletas:', coordenadas);
    }
  }
  
}
