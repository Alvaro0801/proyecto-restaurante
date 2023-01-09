const payServices = require("../services/payServices");
const orderServices = require("../services/orderServices");

const { verifyToken } = require("../utils/handleToken");

const getPays = async (req, res) => {
    try {
        const pays= await payServices.getPays(id_pago);
        return res.status(201).send(pays);
    } catch (error) {
      return res.status(401);
    }
  };
  
const getPay = async (req, res) => {
    const { id_pago } = req.body;
    try {
      const pay = await payServices.getPay(id_pago);

      return res.status(201).send(pay);
    } catch (error) {
      return res.status(401);
    }
};

const createPay = async (req, res) => {
    console.log("controllerPay");
    id_ped = 2;
    id_mpago = 1;
    fecha_pago = 20220603;
    total_pago = 85;

    const pay = await payServices.createPay(id_mpago, id_ped, fecha_pago, total_pago);
    await orderServices.updateEstadoPedidoById(id_ped,4);
    return res.status(201).send(pay);
  }

module.exports = {
    getPays,
    getPay,
    createPay
};