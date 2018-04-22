import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorhandler from 'strong-error-handler';
// import {movies} from './routes/movies';
// import {actors} from './routes/actors';
import {inicial} from './routes/database';
import {almacens} from './routes/almacen';
import {sucursals} from './routes/sucursal';
import {productos} from './routes/producto';
import {productolineas} from './routes/productolinea';
import {productosublinea} from './routes/productosublinea';
import {productocategoria} from './routes/productocategoria';
import {proveedores} from './routes/proveedor';
import { Response, Request, NextFunction, ErrorRequestHandler } from "express";


export const app = express();

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// middleware for json body parsing
app.use(bodyParser.json({limit: '5mb'}));

// enable corse for all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");

  next();
});

app.use('/', inicial);
// app.use('/movies', movies);
// app.use('/actors', actors);
app.use('/almacenes', almacens);
app.use('/productos', productos);
app.use('/sucursales', sucursals);
app.use('/lineas', productolineas);
app.use('/sublineas', productosublinea);
app.use('/categorias', productocategoria);
app.use('/proveedores', proveedores);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response) {
  const errMensaje: string = 'HTTP 404 Not Found o HTTP 404 No encontrado';
  const err = new Error(errMensaje);
  const messageError = {
    status: 404,
    request_url: req.originalUrl,
    message: err.message
  };
  res.status(messageError.status).json(messageError);
  console.log(`status ${messageError.status}, request_url:${messageError.request_url}, message:${messageError.message}`)
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const messageError = {
    status: 500,
    request_url: req.originalUrl,
    message: err.message
  };
  // render the error page
  res.status(err.status || 500);
  res.status(messageError.status).json(messageError);
});

app.use(errorhandler({
  debug: process.env.ENV !== 'prod',
  log: true,
}));
