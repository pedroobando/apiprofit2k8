import {Router, Request, Response, NextFunction} from 'express';
import {Sucursal} from '../models/Sucursal';
import {Almacen} from '../models/Almacen';

export const sucursals = Router();
const paginateSize: number = 40;

sucursals.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      status: 200,
      request_url: req.originalUrl,
      message: await Sucursal.scope(req.query['scope']).findAndCountAll()
    });
    
  } catch (e) {
    console.log(e);
    next(e);
  }
});

sucursals.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const sucursales = await Sucursal.scope(req.query['scope']).findAndCountAll({
        order: [['alma_des', order]],
        limit: limitPage,
        offset: offset2,
        where: { alma_des: {$like: `%${filtername}%`}}
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(sucursales);
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

sucursals.get('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    let numRequest: number = 0;
    if (!Id) {
      return res.status(400).json(_clearObject({id: 0, name: '', active: false}));
    }

    const sucursal = await Sucursal.scope(req.query['scope']).findOne({
      where: { co_alma: Id},
      include: [Almacen]
    }).then((theObject) => {
      if (theObject) {
        numRequest = 200;
        return {data: _clearObject(theObject), rows: _clearAlmacenAll(theObject.almacenes)};  
      } else {
        numRequest = 404;
        return {data: {co_alma: '0', name: ''}};
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json(_errorObject(err, '/'));
    });
    res.status(numRequest).json(sucursal);
  } catch (e) {
    next(e);
  }
});

sucursals.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuidv4 = require('uuid/v4');
    await Sucursal.create({
      co_alma: req.body.keyId,
      alma_des: req.body.name,
      co_sucu:  req.body.co_sucu,
      nro_fact: req.body.nro_fact,
      rowguid: uuidv4()
    }).then((theObject) => {
      res.sendStatus(201);
    }).catch((err) => {
      // console.log(err);
      res.status(500).json(_errorObject(err, '/'));
    });    
  } catch (e) {
    next(e);
  }
});

sucursals.put('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    req.body.alma_des = req.body.name;
    await Sucursal.update(req.body,
    {
      where: {
        co_alma: Id
      }
    }).then((affectedRows) => {
      if (affectedRows["0"]) {
        res.sendStatus(202);
      } else {
        res.sendStatus(404);
      }
    }).catch((err) => {
      res.status(500).json(_errorObject(err, '/'));
    });
  } catch (e) {
    next(e);
  }
});

sucursals.delete('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    await Sucursal.destroy(
    {
      where: {
        co_alma: Id
      }
     }).then((affectedRows) => {
      if (affectedRows >= 1) {
        res.sendStatus(202);
      } else {
        res.sendStatus(404);
      }
    }).catch((err) => {
      res.status(500).json(_errorObject(err, '/'));
    });
  } catch (e) {
    next(e);
  }
});

function _clearObjectAll(_objectAll) {
  const objectAll = [];
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject));
  });
 return objectAll;
}

function _clearAlmacenAll(_objectAll) {
  const objectAll = [];
  _objectAll.forEach((tObject) => {
    objectAll.push({co_sub: tObject.co_sub.trim(), des_sub: tObject.des_sub.trim()});
  });
 return objectAll;
}

function _clearObject(_object) {
  return {
    co_alma: _object.co_alma.trim(),
    name: _object.alma_des.trim()
  };
}

function _errorObject(_err, onfunction) {
  return {
    message: `Error On Server ${onfunction} - sucursal`,
    data: _err
  };
}

function _returnJson(_data, _thepaginate) {
  return {
    rows: _data, paginate: _thepaginate,  
  };
}

function _paginate(_activePage, _totalPage, _totalItem, _showItem) {
  return {
    activePage: _activePage, totalPage: _totalPage, totalItem: _totalItem, showItem: _showItem
  };
}
