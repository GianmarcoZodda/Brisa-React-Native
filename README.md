Descripcion: 
La aplicación móvil de BrisaApp está diseñada para proporcionar a los usuarios una experiencia intuitiva y directa para gestionar y visualizar los resultados de análisis de retinas. Esta app se conecta al backend y a las APIs de análisis, permitiendo a los usuarios:

Subir imágenes de sus retinas para análisis.
Consultar resultados detallados, proporcionados por el sistema de análisis basado en inteligencia artificial.
Gestionar su perfil, incluyendo información como nombre de usuario, correo electrónico y contraseña.
Visualizar un historial de imágenes y sus respectivos resultados.
Características clave
Autenticación de usuarios: Registro e inicio de sesión seguro.
Gestión de imágenes: Subida de imágenes directamente desde el dispositivo móvil.
Resultados detallados: Visualización de análisis específicos relacionados con enfermedades o anomalías detectadas en las retinas.
Interfaz intuitiva: Diseñada para una navegación fácil y accesible.
Integración con APIs: Comunicación en tiempo real con el backend y las APIs de análisis.
Tecnologías utilizadas

React Native: Para el desarrollo multiplataforma (Android e iOS).
Axios: Para las peticiones HTTP al backend.
Expo: Para pruebas rápidas y despliegue (si estás usando Expo).

1. Instalar React
Antes de comenzar, asegúrate de tener React instalado. Puedes seguir esta guía:
Instalación de React.

2. Clonar el repositorio
Crea una carpeta vacía en tu sistema.
Haz clic derecho dentro de la carpeta y selecciona "Abrir en terminal".
En la terminal, escribe el siguiente comando para clonar el repositorio:
git clone [URL APP MOBILE]
3. Abrir el proyecto en Visual Studio Code
En la terminal, escribe:
code .
Esto abrirá el proyecto en Visual Studio Code.
4. Instalar dependencias
En la terminal de Visual Studio Code, ejecuta:
npm install
Esto instalará todas las dependencias necesarias para el proyecto.

5. Configurar la URL de la API
Abre el archivo apiUrl.js.
Actualiza el valor de la URL con tu dirección IPV4.
Puedes obtener tu dirección IPV4 ejecutando el comando ipconfig (en Windows) o ifconfig (en macOS/Linux) en la terminal.
6. Iniciar la aplicación
En la terminal, escribe:
npm start
Esto iniciará la aplicación móvil en modo desarrollo
