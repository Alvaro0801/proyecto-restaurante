const { Router } = require("express");
const { isLoggedIn, verifyLoggedIn } = require("../../middleware/authentication");
const { getOrderByTable, getOrderDetailsByOrder, getNumberTableByOrder } = require("../../services/orderServices");

const router = Router();

router.get('/pago', isLoggedIn, async (req,res) => {
    const nom_usu=req.name;
    const nom_tipousu=req.role;
    
    cod_ped = req.query.cod;
    console.log(cod_ped);
    ped = await getOrderByTable(cod_ped);
    console.log(ped);
    det = await getOrderDetailsByOrder(ped[0].id_ped);
    console.log(det);
    
    const {num_mesa} = await getNumberTableByOrder(ped[0].id_ped);
    console.log(num_mesa);

    total = 0;
    for (let i = 0; i < det.length; i++) { total = total + det[i].subtotal; }

    res.render('cajero/realizarPago', { nom_usu, nom_tipousu, ped, det, num_mesa, total });
})

module.exports = router;