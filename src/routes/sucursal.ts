import {Router} from 'express';
import {Sucursal} from '../models/Sucursal';
// import {MovieActor} from '../models/MovieActor';

export const sucursals = Router();

sucursals.get('/', async (req, res, next) => {
  try {
    // res.json();
    res.json({
      status: 200,
      request_url: req.originalUrl,
      message: await Sucursal.scope(req.query['scope']).findAndCountAll({
        attributes: ['co_alma', 'alma_des']
        })
    });

  } catch (e) {
    next(e);
  }
});

sucursals.get('/:id', async (req, res, next) => {
  try {
    const actor = await Sucursal.scope(req.query['scope']).findById(req.params['id']);
    res.json(actor);
  } catch (e) {
    next(e);
  }
});
