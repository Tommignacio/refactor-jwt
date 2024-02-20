/** variables de entorno comunes en mi aplicacion **/
import dotenv from 'dotenv'
dotenv.config()

export const envConfig = {
    PORT: +process.env.PORT || 8080,
    DB_URI: process.env.DB_URI,
    SIGNED_COOKIE: process.env.SIGNED_COOKIE,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    APP_ID: process.env.APP_ID,
    CLIENT_ID: process.env.CLIENT_ID,
}
