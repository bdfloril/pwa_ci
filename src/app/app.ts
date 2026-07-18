import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modelo para representar una tarea
interface Tarea {
  texto: string;
  completada: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  titulo = 'Laboratorio de PWA';

  nuevaTarea = '';

  estaOnline = navigator.onLine;

  tareas: Tarea[] = [
    {
      texto: 'Revisar manifest del PWA',
      completada: false
    },
    {
      texto: 'Verificar service worker',
      completada: false
    },
    {
      texto: 'Probar la aplicación sin conexion',
      completada: false
    }
  ];

  indice!: number;

  ngOnInit(): void {

    console.log('[App] Aplicacion iniciada');
    console.log('[App] Estado inicial:', this.estaOnline ? 'Online' : 'Offline');

    if ('serviceWorker' in navigator) {

      console.log('[App] El navegador soporta Service Workers');

      navigator.serviceWorker.ready.then((registro) => {

        console.log('[App] Service Worker listo:', registro);

        console.log('[App] Controller:', navigator.serviceWorker.controller);

        // Escuchar mensajes enviados por el Service Worker
        navigator.serviceWorker.addEventListener('message', (event) => {

          console.log('[App] Mensaje recibido desde el Service Worker');
          console.log(event.data);

          if (event.data?.mensaje) {
            alert(event.data.mensaje);
          }

        });

        // Esperar un momento y enviar un mensaje al Service Worker
        setTimeout(() => {

          if (navigator.serviceWorker.controller) {

            console.log('[App] Enviando mensaje al Service Worker...');

            navigator.serviceWorker.controller.postMessage({
              mensaje: 'Hola Service Worker'
            });

          } else {

            console.log('[App] No existe controller');

          }

        }, 1000);

      });

    } else {

      console.warn('[App] Este navegador no soporta Service Workers');

    }

  }

  @HostListener('window:online')
  cuandoVuelveInternet() {
    this.estaOnline = true;
    console.log('[App] La aplicación volvió a estar en línea');
  }

  @HostListener('window:offline')
  cuandoPierdeInternet() {
    this.estaOnline = false;
    console.log('[App] La aplicación quedó sin conexión');
  }

  agregarTarea() {

    const textoLimpio = this.nuevaTarea.trim();

    if (textoLimpio.length === 0) {
      console.warn('[App] No se agregó la tarea porque está vacía');
      return;
    }

    this.tareas.push({
      texto: textoLimpio,
      completada: false
    });

    console.log('[App] Tarea agregada:', textoLimpio);

    this.nuevaTarea = '';

  }

  cambiarEstado(tarea: Tarea) {

    tarea.completada = !tarea.completada;

    console.log('[App] Estado de tarea cambiado:', tarea);

  }

  eliminarTarea(indice: number) {

    const tareaEliminada = this.tareas[indice];

    this.tareas.splice(indice, 1);

    console.log('[App] Tarea eliminada:', tareaEliminada);

  }

}