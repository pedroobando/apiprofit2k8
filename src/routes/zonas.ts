import {Router, Request, Response, NextFunction} from 'express';

import { Zona } from '../models/Zona';
import { Sucursal } from '../models/Sucursal';

export const zonas = Router();
const paginateSize: number = 40;

zonas.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const lasZonas = await Zona.scope(req.query['scope']).findAndCountAll({
        order: [['zon_des', order]],
        limit: limitPage,
        offset: offset2,
        where: {zon_des: {$like: `%${filtername}%`}},
        include: [Sucursal]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        // console.log(objectAll);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(lasZonas);
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

zonas.get('/porsucursal/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const lasZonas = await Zona.scope(req.query['scope']).findAndCountAll({
        order: [['zon_des', order]],
        limit: limitPage,
        offset: offset2,
        where: {zon_des: {$like: `%${filtername}%`}, co_sucu: Id},
        include: [Sucursal]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        // console.log(objectAll);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(lasZonas);
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

zonas.get('/help', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const retvalor = {
      keyId: '001', co_zon: '001', name: 'nombre', co_sucu:  '002', trasnfe: '1', revisado: '1',
      dis_cen: 'dis_cen',
      campo1: 'STRING LARGO (80)', campo2: 'STRING LARGO (80)', campo3: 'STRING LARGO (80)', campo4: 'STRING LARGO (80)',
      rowguid: 'rowguid'
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

zonas.get('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    let numRequest: number = 0;
    if (!Id) {
      return res.status(400).json(_clearObject({co_zon: 0, name: '', active: false}));
    }

    const lineas = await Zona.scope(req.query['scope']).findOne({
      where: { co_zon: Id},
      include: [Sucursal]
    }).then((theObject) => {
      if (theObject) {
        numRequest = 200;
        return {data: _clearObject(theObject)};  
      } else {
        numRequest = 404;
        return {data: {co_zon: 0, name: '' }};
      }
    }).catch((err) => {
      // console.log(err);
      res.status(500).json(_errorObject(err, '/'));
    });

    res.status(numRequest).json(lineas);
  } catch (e) {
    next(e);
  }
});

// keyId: '001', name: 'nombre', co_sucu:  '002', co_zon: '003', c_cuenta: '002', p_cuenta: '1', dis_cen: 'dis_cen', direcc2: 'direcc2',
// telefonos: '0032342897', respons: 'UND', fecha_reg: '20010212', co_pais: '007', ciudad: 'VALENCIA', zip: '0932',
// campo1: 'STRING LARGO (80)', campo2: 'STRING LARGO (80)', campo3: 'STRING LARGO (80)', campo4: 'STRING LARGO (80)',
// campo5: 'STRING LARGO (80)', campo6: 'STRING LARGO (80)', campo7: 'STRING LARGO (80)', campo8: 'STRING LARGO (80)',
// rowguid: 'rowguid'

zonas.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuidv4 = require('uuid/v4');
    await Zona.create({
      co_zon: req.body.keyId,
      zon_des: req.body.name,
      co_sucu:  req.body.co_sucu,
      revisado: req.body.revisado,
      trasnfe: req.body.transfe,
      dis_cen: req.body.dis_cen,
      campo1: req.body.campo1,
      campo2: req.body.campo2,
      campo3: req.body.campo3,
      campo4: req.body.campo4,
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

zonas.put('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    // Verificacion de la propiedad name, para su respectivo guardado
    // en la base de datos
    if (typeof req.body.name !== "undefined") {
      req.body.zon_des = req.body.name;  
    }
    await Zona.update(req.body,
    {
      where: {
        co_zon: Id
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

zonas.delete('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    await Zona.destroy(
    {
      where: {
        co_zon: Id
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

function _clearObject(_object) {
  return {
    keyId: _object.co_zon.trim(),
    co_zon: _object.co_zon.trim(),
    name: _object.zon_des.trim(),
    revisado: _object.revisado,
    trasnfe: _object.trasnfe,
    dis_cen: _object.dis_cen.trim(),
    codigo: {
      co_sucu:  _object.co_sucu.trim(),
      alma_des: !isNaN(_object.sucursal) ? '(SIN SUCURSAL)' : _object.sucursal.alma_des.trim(),
    },
    campos: {
      campo1: _object.campo1.trim(),
      campo2: _object.campo2.trim(),
      campo3: _object.campo3.trim(),
      campo4: _object.campo4.trim(),
    },
    rowguid: _object.rowguid
  };
}

function _errorObject(_err, onfunction) {
  return {
    message: `Error On Server ${onfunction} - Zona`,
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
