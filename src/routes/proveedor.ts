import {Router, Request, Response, NextFunction} from 'express';
import { Sucursal } from '../models/Sucursal';
// import { ProductoSubLinea } from '../models/ProductoSubLinea';
import { Proveedor } from '../models/Proveedor';
import { Segmento } from '../models/Segmento';
// import { ProductoLinea } from '../models/ProductoLinea';
// import { ProductoCategoria } from '../models/ProductoCategoria';

export const proveedores = Router();
const paginateSize: number = 40;

proveedores.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const losProveedores = await Proveedor.scope(req.query['scope']).findAndCountAll({
        order: [['prov_des', order]],
        limit: limitPage,
        offset: offset2,
        where: {prov_des: {$like: `%${filtername}%`}},
        include: [Sucursal, Segmento]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        // console.log(objectAll);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(losProveedores);
    
  } catch (e) {
    // console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

proveedores.get('/porsucursal/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const losProveedores = await Proveedor.scope(req.query['scope']).findAndCountAll({
        order: [['prov_des', order]],
        limit: limitPage,
        offset: offset2,
        where: {prov_des: {$like: `%${filtername}%`}, co_sucu: Id},
        include: [Sucursal, Segmento]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        // console.log(objectAll);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(losProveedores);
    
  } catch (e) {
    // console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

proveedores.get('/help', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const retvalor = {
      keyId: '001', co_prov: '001', name: 'nombre', co_sucu:  '002', co_seg: '003', co_zon: '002', inactivo: '1',
      direc1: 'direcc1', direc2: 'direcc2', telefonos: '0032342897', respons: 'UND', fecha_reg: '20010212', co_pais: '007',
      ciudad: 'VALENCIA', zip: '0932',
      campo1: 'STRING LARGO (80)', campo2: 'STRING LARGO (80)', campo3: 'STRING LARGO (80)', campo4: 'STRING LARGO (80)',
      campo5: 'STRING LARGO (80)', campo6: 'STRING LARGO (80)', campo7: 'STRING LARGO (80)', campo8: 'STRING LARGO (80)',
      rowguid: 'rowguid'
    };
    // , procedenci: 'NAC',
    const ayudas = _returnJson(retvalor,
      _paginate(1, 1, 1, 1));
    res.status(200).json(ayudas);
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

proveedores.get('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    let numRequest: number = 0;
    if (!Id) {
      return res.status(400).json(_clearObject({id: 0, name: '', active: false}));
    }

    const lineas = await Proveedor.scope(req.query['scope']).findOne({
      where: { co_prov: Id},
      include: [Sucursal, Segmento]
    }).then((theObject) => {
      if (theObject) {
        numRequest = 200;
        return {data: _clearObject(theObject)};  
      } else {
        numRequest = 404;
        return {data: {co_prov: '0', name: '' }};
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

// keyId: '001', name: 'nombre', co_sucu:  '002', co_seg: '003', co_zon: '002', inactivo: '1', direcc1: 'direcc1', direcc2: 'direcc2',
// telefonos: '0032342897', respons: 'UND', fecha_reg: '20010212', co_pais: '007', ciudad: 'VALENCIA', zip: '0932',
// campo1: 'STRING LARGO (80)', campo2: 'STRING LARGO (80)', campo3: 'STRING LARGO (80)', campo4: 'STRING LARGO (80)',
// campo5: 'STRING LARGO (80)', campo6: 'STRING LARGO (80)', campo7: 'STRING LARGO (80)', campo8: 'STRING LARGO (80)',
// rowguid: 'rowguid'

proveedores.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuidv4 = require('uuid/v4');
    await Proveedor.create({
      co_prov: req.body.keyId,
      prov_des: req.body.name,
      co_sucu:  req.body.co_sucu,
      co_seg: req.body.co_seg,
      co_zon: req.body.co_zon,
      inactivo: req.body.inactivo,
      direc1: req.body.direc1,
      direc2: req.body.direc2,
      telefonos: req.body.telefonos,
      respons: req.body.respons,
      co_pais: req.body.co_pais,
      ciudad: req.body.ciudad,
      fecha_reg: req.body.fecha_reg,
      zip: req.body.zip,
      // procedenci: req.body.procedenci,
      campo1: req.body.campo1,
      campo2: req.body.campo2,
      campo3: req.body.campo3,
      campo4: req.body.campo4,
      campo5: req.body.campo5,
      campo6: req.body.campo6,
      campo7: req.body.campo7,
      campo8: req.body.campo8,      
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

proveedores.put('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    // Verificacion de la propiedad name, para su respectivo guardado
    // en la base de datos
    if (typeof req.body.name !== "undefined") {
      req.body.prov_des = req.body.name;  
    }
    await Proveedor.update(req.body,
    {
      where: {
        co_prov: Id
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

proveedores.delete('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    await Proveedor.destroy(
    {
      where: {
        co_prov: Id
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
    keyId: _object.co_prov.trim(),
    co_prov: _object.co_prov.trim(),
    name: _object.prov_des.trim(),
    inactivo: _object.inactivo,
    direc1: _object.direc1.trim(),
    direc2: _object.direc2.trim(),
    telefonos: _object.telefonos.trim(),
    respons: _object.respons.trim(),
    ciudad: _object.ciudad.trim(),
    fecha_reg: _object.fecha_reg,
    zip: _object.zip.trim(),
    // procedenci: _object.procedenci.trim(),
    codigo: {
      co_sucu:  _object.co_sucu.trim(),
      alma_des:  _object.sucursal.alma_des,
      co_seg: _object.co_seg.trim(),
      seg_des: _object.segmento.seg_des,
      co_zon: _object.co_zon.trim(),
      co_pais: _object.co_pais.trim(),
    },
    campos: {
      campo1: _object.campo1.trim(),
      campo2: _object.campo2.trim(),
      campo3: _object.campo3.trim(),
      campo4: _object.campo4.trim(),
      campo5: _object.campo5.trim(),
      campo6: _object.campo6.trim(),
      campo7: _object.campo7.trim(),
      campo8: _object.campo8.trim(),
    },
    rowguid: _object.rowguid
  };
}

function _errorObject(_err, onfunction) {
  return {
    message: `Error On Server ${onfunction} - Proveedor`,
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
