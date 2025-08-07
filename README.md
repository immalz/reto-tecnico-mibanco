# Reto tecnico - Cotizador vehicular y catalogo.

Este proyecto incluye dos aplicaciones Angular desarrolladas para un reto técnico. Ambas aplicaciones están organizadas en carpetas independientes:

- `cotizador-vehicular`: Aplicación para calcular cotizaciones de seguros de autos.
- `catalogo-vehicular`: Aplicación para visualizar y buscar vehículos disponibles por marca y modelo.

## Requisitos

Asegúrate de tener instalado lo siguiente en tu entorno:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [Docker desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (descargar la ultima versión segun tu SO)

## Instalación

1. **Clonar el repositorio o descargar los archivos**
2. Instalar pnpm
   ```bash
      npm install -g pnpm
   ```
3. Abrir una terminal en la raíz de cada carpeta (`cotizador-vehicular` y `catalogo-vehicular`) y ejecutar:
   ```bash
      pnpm install
   ```
4. Generar el build de cada proyecto con el comando:
   ```bash
      ng build
   ```
5. Generar la imagen de docker de cada proyecto con el comando:
   ```bash
     docker build -t cotizador-vehicular .
     docker build -t catalogo-vehicular .  
   ```
6. (OPCIONAL) puede probar cada proyecto de forma individual ejecutando el comando:
   ```bash
     docker run -p 8080:80 cotizador-vehicular
     docker run -p 8081:80 catalogo-vehicular  
   ```
7. Para ejecutar ambos proyectos en un docker-compoose, luego de haber generado el build, situate en la raiz del proyecto y ejecuta:
   ```bash
    docker-compose up --build
   ```
