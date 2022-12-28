const conn = require("../config/bd");

  const pedMes = async (arrayfecha) => {
    const users = await conn.query(`select count(ped.id_ped),sum(det.cantidad_det)
    ,sum(det.cantidad_det*prod.precio_u_prod),ped.id_usu,u.nom_usu from usuario as u inner join pedido as ped on u.id_usu=ped.id_usu inner join detalle_pedido as det on ped.id_ped=det.id_ped 
    inner join producto as prod on prod.id_prod=det.id_prod inner join categoria as 
    cat on cat.id_categoria=prod.id_categoria where month(ped.fecha_ped)=? and year(ped.fecha_ped)=? group by ped.id_usu;`,arrayfecha);
    if (!users) throw new Error();
    return users;
  };
  const catMes = async (arrayfecha) => {
    const users = await conn.query(`select cat.nom_categoria,sum(prod.precio_u_prod*det.cantidad_det) from categoria as cat inner join producto as prod on cat.id_categoria=prod.id_categoria 
    inner join detalle_pedido as det on det.id_prod=prod.id_prod inner join pedido as ped on ped.id_ped=det.id_ped where month(ped.fecha_ped)=? and year(ped.fecha_ped)=? group by cat.nom_categoria;`,arrayfecha);
    if (!users) throw new Error();
    return users;
  };
  const pedDia = async (arrayfecha) => {
    const users = await conn.query(`select count(ped.id_ped),sum(det.cantidad_det)
    ,sum(det.cantidad_det*prod.precio_u_prod),ped.id_usu,u.nom_usu from usuario as u inner join pedido as ped on u.id_usu=ped.id_usu inner join detalle_pedido as det on ped.id_ped=det.id_ped 
    inner join producto as prod on prod.id_prod=det.id_prod inner join categoria as 
    cat on cat.id_categoria=prod.id_categoria where ped.fecha_ped=? group by ped.id_usu;`,arrayfecha);
    if (!users) throw new Error();
    return users;
  };
  const catDia = async (arrayfecha) => {
    const users = await conn.query(`select cat.nom_categoria,sum(prod.precio_u_prod*det.cantidad_det) from categoria as cat inner join producto as prod on cat.id_categoria=prod.id_categoria 
    inner join detalle_pedido as det on det.id_prod=prod.id_prod inner join pedido as ped on ped.id_ped=det.id_ped where fecha_ped=? group by cat.nom_categoria;`,arrayfecha);
    if (!users) throw new Error();
    return users;
  };

module.exports={
    pedMes,
    pedDia,
    catMes,
    catDia,
}