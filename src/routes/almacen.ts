import {Router, Request, Response, NextFunction} from 'express';
import {Sucursal} from '../models/Sucursal';
import {Almacen} from '../models/Almacen';

const paginateSize: number = 40;
export const almacens = Router();

almacens.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const almacenes = await Almacen.scope(req.query['scope']).findAndCountAll({
        order: [['des_sub', order]],
        limit: limitPage,
        offset: offset2,
        where: { des_sub: {$like: `%${filtername}%`}},
        include: [Sucursal]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(almacenes);
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

almacens.get('/porsucursal/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    // const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const almacenes = await Almacen.scope(req.query['scope']).findAndCountAll({
        order: [['des_sub', order]],
        limit: limitPage,
        offset: offset2,
        where: { co_alma: Id},
        include: [Sucursal]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(almacenes);
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

almacens.get('/help', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const retvalor = {
      keyId: '001', name: 'nombre', co_sucu: '01', co_alma: '02', co_lin: '032', co_subl: '021',
      campo1: 'string largo', campo2: 'string largo', campo3: 'string largo', campo4: 'string largo',
      uni_venta: 'und', stock_act: '3212.21'
    };

    const ayudas = _returnJson(retvalor,
      _paginate(1, 1, 1, 1));
    res.status(200).json(ayudas);
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

almacens.get('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    let numRequest: number = 0;
    if (!Id) {
      return res.status(400).json(_clearObject({id: 0, name: '', active: false}));
    }

    const almacenes = await Almacen.scope(req.query['scope']).findOne({
      where: { co_sub: Id}
    //   include: [Almacen]
    }).then((theObject) => {
      if (theObject) {
        numRequest = 200;
        return {data: _clearObject(theObject)};  
      } else {
        numRequest = 404;
        return {data: {co_sub: '0', name: ''}};
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json(_errorObject(err, '/'));
    });
    res.status(numRequest).json(almacenes);
  } catch (e) {
    next(e);
  }
});

almacens.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuidv4 = require('uuid/v4');
    await Almacen.create({
      co_sub: req.body.keyId,
      des_sub: req.body.name,
      co_sucu: req.body.co_sucu,
      co_alma: req.body.co_alma,
      co_lin: req.body.co_lin,
      co_subl: req.body.co_subl,
      campo1: req.body.campo1,
      campo2: req.body.campo2,
      campo3: req.body.campo3,
      campo4: req.body.campo4,
      uni_venta: req.body.uni_venta,
      stock_act: req.body.stock_act,
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

almacens.put('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    // Verificacion de la propiedad name, para su respectivo guardado
    // en la base de datos
    if (typeof req.body.name !== "undefined") {
      req.body.des_sub = req.body.name;  
    }
    await Almacen.update(req.body,
    {
      where: {
        co_sub: Id
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

almacens.delete('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    await Almacen.destroy(
    {
      where: {
        co_sub: Id
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
    // objectAll.push(_clearObject(tObject));
    objectAll.push(_clearSucursalObject(tObject))
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
    co_sub: _object.co_sub.trim(), name: _object.des_sub.trim(), co_alma: _object.co_alma.trim(),
    co_sucu: _object.co_sucu.trim(),
    campos: { campo1: _object.campo1.trim(), campo2: _object.campo2.trim(), campo3: _object.campo3.trim(), campo4: _object.campo4.trim() }, 
    active: { noventa: _object.noventa, nocompra: _object.nocompra, materiales: _object.materiales, produccion: _object.produccion }
  };
}

function _clearSucursalObject(_object) {
  return {
    co_sub: _object.co_sub.trim(),
    name: _object.des_sub.trim(),
    co_alma: _object.co_alma.trim(),
    alma_des: _object.sucursal.alma_des.trim(), 
    co_sucu: _object.co_sucu.trim(),
    campos: {
      campo1: _object.campo1.trim(),
      campo2: _object.campo2.trim(),
      campo3: _object.campo3.trim(),
      campo4: _object.campo4.trim()
    }, 
    active: {
      noventa: _object.noventa,
      nocompra: _object.nocompra,
      materiales: _object.materiales,
      produccion: _object.produccion
    }
  };
}

function _errorObject(_err, onfunction) {
  return {
    message: `Error On Server ${onfunction} - almacen`,
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
