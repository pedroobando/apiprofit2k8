import {Router, Request, Response, NextFunction} from 'express';
import { Sucursal } from '../models/Sucursal';
import { ProductoSubLinea } from '../models/ProductoSubLinea';
import { Producto } from '../models/Producto';
import { ProductoLinea } from '../models/ProductoLinea';
import { ProductoCategoria } from '../models/ProductoCategoria';
import { Proveedor } from '../models/Proveedor';

export const productos = Router();
const paginateSize: number = 40;

productos.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    const incluirAnulado: boolean = !req.query.incluiranulado ? false : (req.query.incluiranulado == 'true' ? true : false);
    
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const losProductos = await Producto.scope(req.query['scope']).findAndCountAll({
      order: [['art_des', order]],
      limit: limitPage,
      offset: offset2,
      where: {art_des: {$like: `%${filtername}%`}, anulado: incluirAnulado},
      include: [Sucursal, ProductoLinea, ProductoSubLinea, ProductoCategoria, Proveedor]
    }).then((objectAll) => {
      const totalItems: number = objectAll.count;
      const totalPage: number = Math.ceil(objectAll.count / limitPage);
      const showItem: number = (objectAll.rows.length);
      // console.log(objectAll);
      return _returnJson(_clearObjectAll(objectAll.rows),
        _paginate(activePage, totalPage, totalItems, showItem));
    });
    res.status(200).json(losProductos);

    // console.log(`limitPage: ${limitPage}`);
    // console.log(`activePage: ${activePage}`);
    // console.log(`offset2: ${offset2}`);

  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

productos.get('/porlinea/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const losProductos = await Producto.scope(req.query['scope']).findAndCountAll({
        order: [['art_des', order]],
        limit: limitPage,
        offset: offset2,
        where: {art_des: {$like: `%${filtername}%`}, co_lin: Id},
        // include: [Sucursal, ProductoSubLinea, ProductoLinea, ProductoCategoria]
        include: [Sucursal, ProductoLinea, ProductoSubLinea, ProductoCategoria, Proveedor]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        // console.log(objectAll);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(losProductos);
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

productos.get('/porsublinea/:keyIdSublinea', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const IdLinea: string = req.params.keyId.trim();
    const IdSubLinea: string = req.params.keyIdSublinea.trim();
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const losProductos = await Producto.scope(req.query['scope']).findAndCountAll({
        order: [['art_des', order]],
        limit: limitPage,
        offset: offset2,
        where: {art_des: {$like: `%${filtername}%`}, co_subl: IdSubLinea },
        // where: {art_des: {$like: `%${filtername}%`}, co_lin: IdLinea, co_subl: IdSubLinea },
        // include: [Sucursal, ProductoSubLinea, ProductoLinea, ProductoCategoria]
        include: [Sucursal, ProductoLinea, ProductoSubLinea, ProductoCategoria, Proveedor]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        // console.log(objectAll);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(losProductos);
    
  } catch (e) {
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

productos.get('/porproveedor/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const IdProveedor: string = req.params.keyId.trim();
    // const IdSubLinea: string = req.params.keyIdSublinea.trim();
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const losProductos = await Producto.scope(req.query['scope']).findAndCountAll({
        order: [['art_des', order]],
        limit: limitPage,
        offset: offset2,
        where: {art_des: {$like: `%${filtername}%`}, co_prov: IdProveedor },
        include: [Sucursal, ProductoSubLinea, ProductoLinea, ProductoCategoria, Proveedor]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        // console.log(objectAll);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });

    res.status(200).json(losProductos);
    
  } catch (e) {
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

productos.get('/help', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const retvalor = {
      keyId: '001', name: 'nombre', co_sucu:  '002', co_lin: '003', co_cat: '002', co_subl: '03',
      co_prov: '0032342897', uni_venta: 'UND', uni_compra: 'UND', stock_act: '32.2', co_color: 'N',
      fecha_reg: '2001/01/01', item: '001', ubicacion: 'BARCELONA', procedenci: 'PORTUGAL', campo1: 'STRING LARGO (80)',
      campo2: 'STRING LARGO (80)', campo3: 'STRING LARGO (80)', campo4: 'STRING LARGO (80)', campo5: 'STRING LARGO (80)',
      campo6: 'STRING LARGO (80)', campo7: 'STRING LARGO (80)', campo8: 'STRING LARGO (80)'
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

productos.get('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    let numRequest: number = 0;
    if (!Id) {
      return res.status(400).json(_clearObject({id: 0, name: '', active: false}));
    }

    const lineas = await Producto.scope(req.query['scope']).findOne({
      where: { co_art: Id},
      include: [Sucursal, ProductoLinea, ProductoSubLinea, ProductoCategoria, Proveedor]
    }).then((theObject) => {
      if (theObject) {
        numRequest = 200;
        return {data: _clearObject(theObject)};  
      } else {
        numRequest = 404;
        return {data: {co_art: '0', name: '' }};
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

// 'co_art', 'art_des', 'co_lin', 'co_cat', 'co_sucu', 'co_subl', 'co_prov',
//   'uni_venta', 'stock_act', 'co_color', 'fecha_reg', 'item', 'ubicacion', 'procedenci',
//   'campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6', 'campo7', 'campo8'

productos.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuidv4 = require('uuid/v4');
    await Producto.create({
      co_art: req.body.keyId,
      art_des: req.body.name,
      co_sucu:  req.body.co_sucu,
      co_lin: req.body.co_lin,
      co_cat: req.body.co_cat,
      co_subl: req.body.co_subl,
      co_prov: req.body.co_prov,
      uni_venta: req.body.uni_venta,
      uni_compra: req.body.uni_venta,
      stock_act: req.body.stock_act,
      stock_com: req.body.stock_com,
      stock_des: req.body.stock_des,
      stock_lle: req.body.stock_lle,
      co_color: req.body.co_color,
      fecha_reg: req.body.fecha_reg,
      item: req.body.item,
      ubicacion: req.body.ubicacion,
      procedenci: req.body.procedenci,
      anulado: req.body.anulado,
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

productos.put('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    // Verificacion de la propiedad name, para su respectivo guardado
    // en la base de datos
    if (typeof req.body.name !== "undefined") {
      req.body.art_des = req.body.name;  
    }
    await Producto.update(req.body,
    {
      where: {
        co_art: Id
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

productos.delete('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    await Producto.destroy(
    {
      where: {
        co_art: Id
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
//     objectAll.push({ co_art: tObject.co_art.trim(), art_des: tObject.art_des.trim() });
//   });
//  return objectAll;
// }

function _clearObject(_object) {
  return {
    keyId: _object.co_art.trim(),
    co_art: _object.co_art.trim(),
    name: _object.art_des.trim(),
    anulado: _object.anulado,
    co_color: _object.co_color.trim(),
    fecha_reg: _object.fecha_reg,
    item: _object.item.trim(),
    ubicacion: _object.ubicacion.trim(),
    procedenci: _object.procedenci.trim(),
    stock: {
      stock_act: _object.stock_act,
      stock_com: _object.stock_com,
      stock_des: _object.stock_des,
      stock_lle: _object.stock_lle
    },
    uni: {
      uni_venta: _object.uni_venta.trim(),
      uni_compra: _object.uni_compra.trim()
    },
    codigo: {
      co_sucu:  _object.co_sucu.trim(),
      alma_des: !isNaN(_object.sucursal) ? '(SIN SUCURSAL)' : _object.sucursal.alma_des.trim(),
      co_lin: _object.co_lin.trim(),
      lin_des: !isNaN(_object.linea) ? '(SIN LINEA)' : _object.linea.lin_des.trim(),
      co_subl: _object.co_subl.trim(),
      subl_des: !isNaN(_object.sublinea) ? '(SIN SUB_LINEA)' : _object.sublinea.subl_des.trim(),
      co_cat: _object.co_cat.trim(),
      cat_des: !isNaN(_object.categoria) ? '(SIN CATEGORIA)' : _object.categoria.cat_des.trim(),
      co_prov: _object.co_prov.trim(),
      prov_des: !isNaN(_object.proveedor) ? '(SIN PROVEEDOR)' : _object.proveedor.prov_des.trim()
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
    message: `Error On Server ${onfunction} - producto`,
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
