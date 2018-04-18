import {Router, Request, Response, NextFunction} from 'express';
import {Sucursal} from '../models/Sucursal';
import {Almacen} from '../models/Almacen';

// import {MovieActor} from '../models/MovieActor';

export const sucursals = Router();

sucursals.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // res.json();
    res.json({
      status: 200,
      request_url: req.originalUrl,
      message: await Sucursal.scope(req.query['scope']).findAndCountAll()
      // message: await Sucursal.scope(req.query['scope']).findAll({include: [Almacen]})
    });
    
  } catch (e) {
    console.log(e);
    next(e);
  }
});

sucursals.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // res.json();
    const PAGESIZE: number = 30;
    const order: string = !req.query.order ? 'ASC' : req.query.order.toUpperCase();
    const filtername: string = !req.query.filtername ? '' : req.query.filtername.toUpperCase();
    
    const limitPage: number = isNaN(req.query.limit) ? PAGESIZE : parseInt(req.query.limit);
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
      // message: await Sucursal.scope(req.query['scope']).findAll({include: [Almacen]})
    

    // res.json({
    //   status: 200,
    //   request_url: req.originalUrl,
    //   menssge: order,
    //   filternam: filtername,
    //   message: await Sucursal.scope(req.query['scope']).findAndCountAll({
    //     limit: limitPage,
    //     offset: offset2,
    //     where: { alma_des: {$like: `%${filtername}`}}
    //   }).then((objectAll) => {
    //     const totalItems: number = objectAll.count;
    //     const totalPage: number = Math.ceil(objectAll.count / limitPage);
    //     const showItem: number = (objectAll.rows.length);
    //     return _returnJson(200,
    //       `Pagina ${activePage} de ${totalPage}`,
    //       _clearObjectAll(objectAll.rows),
    //       _paginate(activePage, totalPage, totalItems, showItem));
    //   })
    //   // message: await Sucursal.scope(req.query['scope']).findAll({include: [Almacen]})
    // });    
    
  } catch (e) {
    console.log(e);
    res.status(500).json(_errorObject(e, '/all'));
    next(e);
  }
});




sucursals.get('/:id', async (req: Request, res: Response, next) => {
  try {

    const sucursal = await Sucursal.scope(req.query['scope']).findOne({
      where: {co_alma: req.params.id},
      include: [Almacen]
    });
    res.json(sucursal);
  } catch (e) {
    next(e);
  }
});



function _clearObjectAll(_objectAll) {
  let objectAll = [];
  _objectAll.forEach((tObject) => {
    objectAll.push(_clearObject(tObject));
  });
 return objectAll;
}

// function _clearAlmacenAll(_objectAll) {
//   var objectAll = [];
//   _objectAll.forEach((tObject) => {
//     objectAll.push({co_sub: tObject.co_sub.trim(), des_sub: tObject.des_sub.trim()})
//   });
//  return objectAll;
// }

function _clearObject(_object) {
  return {
    co_alma: _object.co_alma.trim(), name: _object.alma_des.trim()
  };
}

// function _clearObjectAlmacen(_objectAll)
// {
//   let objectAll = [];
//   _objectAll.forEach((tObject) => {
//     objectAll.push({co_sub: tObject.co_sub.trim(), des_sub: tObject.des_sub.trim()})
//    });
//    return objectAll;
// }


function _errorObject(_err, onfunction) {
  return {
    message: `Error On Server ${onfunction} - sucursal`,
    data: _err
  };
}

function _returnJson(_data, _thepaginate) {
  return {
    // statusCode:_statusCode, message:_message, data:{ records:_data, paginate: _thepaginate }
    rows: _data, paginate: _thepaginate,  
  };
}

function _paginate(_activePage, _totalPage, _totalItem, _showItem) {
  return {
    activePage: _activePage, totalPage: _totalPage, totalItem: _totalItem, showItem: _showItem
  };
}
