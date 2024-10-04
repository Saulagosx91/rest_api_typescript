import express from 'express';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import router from './router';
import db from './config/db';


//Conncet to database
async function connectDB() {
  try {
    db.sync();
    console.log(colors.magenta.bold('Conexion exitosa a la BD'));
    await db.authenticate();

  } catch (error) {
    console.log(error);
    console.log(colors.bgRed.white('Hubo un error al conectar'));
  }

}

connectDB();

const app = express();

//Permitir conexiones
const corsOptions : CorsOptions = {
  origin: (origin, callback) => {
    if(origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('CORS Error'));
    }
  }
}
app.use(cors(corsOptions));

//Permitir entrada de formularios y datos en formato json
app.use(express.json());

app.use(morgan('dev'));

app.use('/api/products', router);


export default app; 