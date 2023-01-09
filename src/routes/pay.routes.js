const { Router } = require("express");
const {validationToken}=require("../middleware/validationToken")
const PayController=require("../controllers/pay.controller");
const PayRouter=Router();

PayRouter.post('/pay-order', PayController.createPay);

module.exports=PayRouter;