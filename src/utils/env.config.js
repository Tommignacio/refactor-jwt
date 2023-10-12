//variables de entorno comunes en mi aplicacion

import dotenv from 'dotenv'
dotenv.config()

//se podra cambiar de puerto escibiendo en la consola PORT= numero nuevo
export const PORT = +process.env.PORT || 8080
