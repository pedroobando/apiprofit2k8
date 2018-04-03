// import {Actor} from '../models/Actor';
// import {MovieActor} from '../models/MovieActor';
import {Router, Request, Response, NextFunction} from 'express';


// import * as ctrlUser from '../controllers/user';
// import * as ctrlDataBase from '../controllers/database';

import {sequelize} from '../sequelize';

export const inicial = Router();

// export const actors = Router();

inicial.get('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const index = [
      {inicio: 'Inicio de la aplicacion'},
      {version: [{activa: 'app/v1'}, {fecha_inicio: '2018-03-28', fecha_final: 'en desarrollo' }]}
    ];
    res.json(await {
      status: 200,
      request_url: req.originalUrl,
      message: index
    });
  } catch (e) {
    next(e);
  }
});

inicial.get('/hola', (req: Request, res: Response) => {
  res.send(`Hola Mundo...!`);
});

inicial.get('/conectdb', (req: Request, res: Response, next: NextFunction) => {
  const conectDb = sequelize.authenticate();
  try {
    
    conectDb.then(() => {
      if (conectDb.isFulfilled()) {
        res.json({ conexion: 'Ok..'});
      } else {
        res.json({ conexion: 'Cancel'});
      }
    });
  } catch (e) {
    next(e);
  }
});  


// export default router;