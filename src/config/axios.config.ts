import axios from "axios";

const apiUrl: string = import.meta.env.BASE_URL

axios.interceptors.response.use(
    response => response,
    error => {
        // Verifica si el error es un error de respuesta HTTP
        if (error.response) {
            // El servidor ha respondido con un código de estado fuera del rango 2xx
            console.error('Error de respuesta HTTP:', error.response.status);
            console.error('Mensaje del servidor:', error.response.data);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió una respuesta
            console.error('Error de solicitud:', error.request);
        } else {
            // Ocurrió un error durante la configuración de la solicitud
            console.error('Error:', error.message);
        }
        // Devuelve una promesa rechazada con el error
        return Promise.reject(error);
    }
);

export default axios.create({
    baseURL: 'http://localhost:3333/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});