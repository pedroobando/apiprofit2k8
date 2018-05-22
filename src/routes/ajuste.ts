import {Router, Request, Response, NextFunction} from 'express';
import { Ajuste } from '../models/Ajuste';
import { Sucursal } from '../models/Sucursal';
import { AjusteDetalle } from '../models/AjusteDetalle';
import { Producto } from '../models/Producto';
import { Almacen } from '../models/Almacen';

export const ajustes = Router();
const paginateSize: number = 40;

ajustes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    const limitPage: number = isNaN(req.query.limit) ? paginateSize : parseInt(req.query.limit);
    const activePage: number = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    const offset2 = limitPage * (activePage - 1);

    const losAjustes = await Ajuste.scope(req.query['scope']).findAndCountAll({
        order: [['ajue_num', order]],
        limit: limitPage,
        offset: offset2,
        where: {motivo: {$like: `%${filtername}%`}},
        include: [Sucursal]
      }).then((objectAll) => {
        const totalItems: number = objectAll.count;
        const totalPage: number = Math.ceil(objectAll.count / limitPage);
        const showItem: number = (objectAll.rows.length);
        // console.log(objectAll);
        return _returnJson(_clearObjectAll(objectAll.rows),
          _paginate(activePage, totalPage, totalItems, showItem));
      });
    res.status(200).json(losAjustes);
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/'));
    next(e);
  }
});

ajustes.get('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    let numRequest: number = 0;
    if (!Id) {
      return res.status(400).json(_clearObject({id: 0, name: '', active: false}));
    }

    const losAjustes = await Ajuste.scope(req.query['scope']).findOne({
      where: { ajue_num: Id},
      include: [Sucursal, AjusteDetalle]
    }).then((theObject) => {
      if (theObject) {
        numRequest = 200;
        return {data: _clearObjectWithDetalle(theObject)};  
      } else {
        numRequest = 404;
        return {data: {ajue_num: '0', name: '' }};
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json(_errorObject(err, '/'));
    });

    res.status(numRequest).json(losAjustes);
  } catch (e) {
    next(e);
  }
});

ajustes.get('/detalles/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    let numRequest: number = 0;
    if (!Id) {
      return res.status(400).json(_clearObject({id: 0, name: '', active: false}));
    }
    const losAjustes = await AjusteDetalle.scope(req.query['scope']).findAndCountAll({
      where: { ajue_num: Id},
      include: [Producto, Almacen]
    }).then((theObject) => {
      if (theObject) {
        numRequest = 200;
        const retDetalleItem = [];
        theObject.rows.forEach((detalleItem) => { retDetalleItem.push(_clearObjectDetalle(detalleItem, true));
        });
        return { data: retDetalleItem };
      } else {
        numRequest = 404;
        return {data: {ajue_num: '0', name: '' }};
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json(_errorObject(err, '/'));
    });

    res.status(numRequest).json(losAjustes);
  } catch (e) {
    next(e);
  }
});

ajustes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuidv4 = require('uuid/v4');
    await Ajuste.create({
      ajue_num: req.body.keyId,
      fecha: req.body.fecha,
      motivo: req.body.motivo.trim(),
      total: req.body.total,
      seriales: req.body.seriales,
      feccom: req.body.feccom,
      numcom: req.body.numcom,
      tasa: req.body.tasa,
      moneda: req.body.moneda,
      dis_cen: req.body.dis_cen,
      co_us_in: req.body.co_us_in,
      fe_us_in: req.body.fe_us_in,
      co_us_mo: req.body.co_us_mo,
      fe_us_mo: req.body.fe_us_mo,
      co_us_el: req.body.co_us_el,
      fe_us_el: req.body.fe_us_el,
      revisado: req.body.revisado,
      trasnfe: req.body.trasnfe,
      anulada: req.body.anulada,
      aux01: req.body.aux01,
      aux02: req.body.aux02,
      produccion: req.body.produccion,
      imp_num: req.body.imp_num,
      fact_num: req.body.fact_num,
      co_sucu:  req.body.co_sucu,
      campo1: req.body.campo1.trim(),
      campo2: req.body.campo2.trim(),
      campo3: req.body.campo3.trim(),
      campo4: req.body.campo4.trim(),
      campo5: req.body.campo5.trim(),
      campo6: req.body.campo6.trim(),
      campo7: req.body.campo7.trim(),
      campo8: req.body.campo8.trim(),
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

ajustes.put('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    // Verificacion de la propiedad name, para su respectivo guardado
    // en la base de datos
    if (typeof req.body.motivo !== "undefined") {
      req.body.motivo = req.body.motivo;  
    }
    await Ajuste.update(req.body,
    {
      where: {
        ajue_num: Id
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

ajustes.delete('/:keyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Id: string = req.params.keyId.trim();
    await Ajuste.destroy(
    {
      where: {
        ajue_num: Id
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

function _clearObjectWithDetalle(_objAjuste: Ajuste) {
  const listAjusteWithDetalle = [];
  try {
    _objAjuste.ajustedetalles.forEach((itemDetalle) => {
      listAjusteWithDetalle.push(_clearObjectDetalle(itemDetalle, false));
    });
  } catch (e) {
    console.log(`Error _clearObjectWithDetalle - ${e.err} - ${e.Error} - ${e}`);
  }
  return {
    ajuste: _clearObject(_objAjuste), detalle: listAjusteWithDetalle
  };
}

function _clearObjectAll(_objectAll) {
  const objectAll = [];
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject));
  });
  return objectAll;
}

function _clearObject(_object: Ajuste) {
  return {
    keyId: _object.ajue_num,
    ajue_num: _object.ajue_num,
    fecha: _object.fecha,
    motivo: _object.motivo.trim(),
    total: _object.total,
    seriales: _object.seriales,
    feccom: _object.feccom,
    numcom: _object.numcom,
    tasa: _object.tasa,
    moneda: _object.moneda.trim(),
    dis_cen: _object.dis_cen,
    fechaus: {
      co_us_in: _object.co_us_in.trim(),
      fe_us_in: _object.fe_us_in,
      co_us_mo: _object.co_us_mo.trim(),
      fe_us_mo: _object.fe_us_mo,
      co_us_el: _object.co_us_el.trim(),
      fe_us_el: _object.fe_us_el
    },
    codigos: {
      co_sucu:  _object.co_sucu.trim(),
      alma_des: !isNaN(_object.sucursal) ? '(SIN SUCURSAL)' : _object.sucursal.alma_des.trim()
    },
    estatus: {
      revisado: _object.revisado.trim(),
      trasnfe: _object.trasnfe.trim(),
      anulada: _object.anulada,
      aux01: _object.aux01,
      aux02: _object.aux02.trim(),
      produccion: _object.produccion,
      imp_num: _object.imp_num,
      fact_num: _object.fact_num
    },
    campos: {
      campo1: _object.campo1.trim(),
      campo2: _object.campo2.trim(),
      campo3: _object.campo3.trim(),
      campo4: _object.campo4.trim(),
      campo5: _object.campo5.trim(),
      campo6: _object.campo6.trim(),
      campo7: _object.campo7.trim(),
      campo8: _object.campo8.trim()
    },
    rowguid: _object.rowguid
    // detalle: _object.ajustedetalles
  };
}

function _clearObjectDetalle(_object: AjusteDetalle, withProductoNombre: boolean = false) {
  try {
    return {
      keyId: _object.ajue_num,
      ajue_num: _object.ajue_num,
      reng_num: _object.reng_num,
      dis_cen: _object.dis_cen,
      tipo: _object.tipo.trim(),
      almacen: {
        co_alma: _object.co_alma.trim(),
        des_sub: !withProductoNombre ? '' : _object.almacen.des_sub.trim(),
      },
      articulo: {
        co_art: _object.co_art.trim(),
        art_des: !withProductoNombre ? '' : _object.producto.art_des.trim(),
        total_art: _object.total_art,
        uni_compra: _object.uni_compra.trim(),
        suni_compr: _object.suni_compr.trim(),
        uni_venta: _object.uni_venta.trim(),
        suni_venta: _object.suni_venta.trim(),
        stotal_art: _object.stotal_art,
        cost_unit_om: _object.cost_unit_om,
        cost_unit: _object.cost_unit,
        cos_pro_un: _object.cos_pro_un,
        cos_pro_om: _object.cos_pro_om,
        ult_cos_om: _object.ult_cos_om,
        total_uni: _object.total_uni,
      },
      feccom: _object.feccom,
      numcom: _object.numcom,
      nro_lote: _object.nro_lote.trim(),
      fec_lote: _object.fec_lote,
      pendiente2: _object.pendiente2,
      tipo_doc2: _object.tipo_doc2,
      reng_doc2: _object.reng_doc2,
      num_doc2: _object.num_doc2,
      mo_cant: _object.mo_cant,
      gf_cant: _object.gf_cant,
      mo_cant_om: _object.mo_cant_om,
      gf_cant_om: _object.gf_cant_om,
      estatus: {
        aux01: _object.aux01,
        aux02: _object.aux02.trim(),
        produccion: _object.produccion,
      },
      rowguid: _object.rowguid
    };
  } catch (e) {
    console.log(e);
  }
}

function _errorObject(_err, onfunction) {
  return {
    message: `Error On Server ${onfunction} - Ajuste`,
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
