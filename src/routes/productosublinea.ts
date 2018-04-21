import {Router, Request, Response, NextFunction} from 'express';
// import {sublineas} from '../models/sublineas';
// import {Almacen} from '../models/Almacen';
import {ProductoSubLinea} from '../models/ProductoSubLinea';
import { ProductoLinea } from '../models/ProductoLinea';
import { Sucursal } from '../models/Sucursal';

export const productosublinea = Router();
const paginateSize: number = 40;

productosublinea.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const sublineas = await ProductoSubLinea.scope(req.query['scope']).findAndCountAll({
        order: [['subl_des', order]],
        limit: limitPage,
        offset: offset2,
        where: { subl_des: {$like: `%${filtername}%`}},
        include: [ProductoLinea, Sucursal]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(sublineas);
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

productosublinea.get('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    let numRequest: number = 0;
    if (!Id) {
      return res.status(400).json(_clearObject({id: 0, name: '', active: false}));
    }

    const sublineas = await ProductoSubLinea.scope(req.query['scope']).findOne({
      where: { co_subl: Id},
      include: [ProductoLinea, Sucursal]
    }).then((theObject) => {
      if (theObject) {
        numRequest = 200;
        return {data: _clearObject(theObject)};  
      } else {
        numRequest = 404;
        return {data: {co_subl: '0', name: ''}};
      }
    }).catch((err) => {
      // console.log(err);
      res.status(500).json(_errorObject(err, '/'));
    });
    // console.log(sublineas);
    res.status(numRequest).json(sublineas);
  } catch (e) {
    next(e);
  }
});

productosublinea.get('/porlinea/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    let numRequest: number = 0;
    if (!Id) {
      return res.status(400).json({rows: []});
    }
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const sublineas = await ProductoSubLinea.scope(req.query['scope']).findAndCountAll({
        order: [['subl_des', order]],
        limit: limitPage,
        offset: offset2,
        where: { co_lin: Id },
        include: [ProductoLinea, Sucursal]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        
        numRequest = (totalItems >= 1 ? 200 : 404);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(numRequest).json(sublineas);
    
    } catch (e) {
      res.status(500).json(_errorObject(e, '/'));
      next(e);
    }    
});

productosublinea.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuidv4 = require('uuid/v4');
    await ProductoSubLinea.create({
      co_subl: req.body.keyId,
      subl_des: req.body.name,
      co_lin: req.body.co_lin,
      co_sucu:  req.body.co_sucu,
      campo1: req.body.campo1,
      campo2: req.body.campo2,
      campo3: req.body.campo3,
      campo4: req.body.campo4,
      rowguid: uuidv4()
    }).then((theObject) => {
      res.sendStatus(201);
    }).catch((err) => {
      res.status(500).json(_errorObject(err, '/'));
    });    
  } catch (e) {
    next(e);
  }
});

productosublinea.put('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    // Verificacion de la propiedad name, para su respectivo guardado
    // en la base de datos
    if (typeof req.body.name !== "undefined") {
      req.body.subl_des = req.body.name;  
    }
    await ProductoSubLinea.update(req.body,
    {
      where: {
        co_subl: Id
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

productosublinea.delete('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    await ProductoSubLinea.destroy(
    {
      where: {
        co_subl: Id
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

// function _clearAlmacenAll(_objectAll) {
//   const objectAll = [];
//   _objectAll.forEach((tObject) => {
//     objectAll.push({ co_subl: tObject.co_subl.trim(), subl_des: tObject.subl_des.trim() });
//   });
//  return objectAll;
// }

function _clearObject(_object) {
  return {
    co_subl: _object.co_subl.trim(),
    name: _object.subl_des.trim(),
    co_lin: _object.co_lin.trim(),
    des_lin: _object.linea.lin_des.trim(),
    co_sucu: _object.co_sucu.trim(),
    alma_des: _object.sucursal.alma_des.trim(),
    campos : {
    campo1: _object.campo1.trim(),
    campo2: _object.campo2.trim(),
    campo3: _object.campo3.trim(),
    campo4: _object.campo4.trim()
    }
  };
}

function _errorObject(_err, onfunction) {
  return {
    message: `Error On Server ${onfunction} - sublinea`,
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
