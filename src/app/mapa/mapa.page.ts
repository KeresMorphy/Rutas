import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import mapboxgl from 'mapbox-gl';

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
  ventas: { kg: number; volumen: number }[] = [];
  cliente: any; // Asegúrate de que la variable cliente esté declarada

  constructor(private route: ActivatedRoute) {
    this.kgValue = 0;
    this.volumenValue = 0;
  }

  ngOnInit(): void {
    // Recuperar el cliente del estado de la página
    this.cliente = history.state.cliente;

    // Si deseas mantener la compatibilidad con la URL, puedes usar queryParams también
    // this.route.queryParams.subscribe((params: { [key: string]: any }) => {
    //   if (params && params['cliente']) {
    //     this.cliente = JSON.parse(params['cliente']);
    //     // Aquí puedes realizar acciones adicionales con la información del cliente
    //   }
    // });
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

  agregarVenta() {
    if (this.kgValue !== null && this.volumenValue !== null) {
      this.ventas.push({ kg: this.kgValue, volumen: this.volumenValue });
      this.kgValue = 0;
      this.volumenValue = 0;
      this.actualizarMapa(); // Llamamos a la función para actualizar el mapa con los nuevos datos
    }
  }

  private actualizarMapa() {
    // Aquí puedes agregar la lógica para actualizar el mapa con los datos de this.ventas
    // Por ejemplo, puedes recorrer el arreglo this.ventas y agregar marcadores al mapa
    // según las coordenadas de cada venta.
    // Puedes consultar la documentación de Mapbox GL JS para obtener más detalles sobre cómo trabajar con el mapa.
    // https://docs.mapbox.com/mapbox-gl-js/api/
  }
}
