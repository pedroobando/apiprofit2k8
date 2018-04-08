import {Router, Request, Response, NextFunction} from 'express';
import {Sucursal} from '../models/Sucursal';
import {Almacen}  from '../models/Almacen';

// import {MovieActor} from '../models/MovieActor';

export const sucursals = Router();

sucursals.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // res.json();
    res.json({
      status: 200,
      request_url: req.originalUrl,
      message: await Sucursal.scope(req.query['scope']).findAll({include: [Almacen]})
    });
    
  } catch (e) {
    console.log(e);
    next(e);
  }
});

sucursals.get('/:id', async (req: Request, res: Response, next) => {
  try {

    const sucursal = await Sucursal.scope(req.query['scope']).findOne({
      where: {co_alma: req.params.keyId},
      include: [Almacen]
    });
    res.json(sucursal);
  } catch (e) {
    next(e);
  }
});
