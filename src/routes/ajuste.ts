import {Router, Request, Response, NextFunction} from 'express';
import { Ajuste } from '../models/Ajuste';
import { Sucursal } from '../models/Sucursal';

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
      include: [Sucursal]
    }).then((theObject) => {
      if (theObject) {
        numRequest = 200;
        return {data: _clearObject(theObject)};  
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

// ['ajue_num', 'fecha', 'motivo', 'total', 'seriales', 'feccom', 'numcom',
// 'tasa', 'moneda', 'dis_cen', 'co_us_in', 'fe_us_in', 'co_us_mo', 'fe_us_mo', 'co_us_el', 'fe_us_el',
// 'campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6', 'campo7', 'campo8',
// 'revisado', 'trasnfe', 'anulada', 'aux01', 'aux02', 'produccion', 'imp_num', 'fact_num', 'co_sucu', 'rowguid' ]

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

function _clearObjectAll(_objectAll) {
  const objectAll = [];
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject));
  });
  return objectAll;
}


// ['ajue_num', 'fecha', 'motivo', 'total', 'seriales', 'feccom', 'numcom',
// 'tasa', 'moneda', 'dis_cen', 'co_us_in', 'fe_us_in', 'co_us_mo', 'fe_us_mo', 'co_us_el', 'fe_us_el',
// 'campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6', 'campo7', 'campo8',
// 'revisado', 'trasnfe', 'anulada', 'aux01', 'aux02', 'produccion', 'imp_num', 'fact_num', 'co_sucu', 'rowguid' ]

function _clearObject(_object) {
  return {
    keyId: _object.ajue_num,
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
  };
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
