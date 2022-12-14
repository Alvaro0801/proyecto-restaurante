const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const { getCountUsers } = require("../../services/userServices");
const {
  getCountOrders,
  getCountOrdersByWaiter,
  getCountOrderWait,
  getCountOrderPrepared,
} = require("../../services/orderServices");
const { getPisos } = require("../../services/pisosServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const router = Router();

// Login
router.get("/", verifyLoggedIn, (req, res) => {
  res.render("login", { layout: false });
});

// Inicio
router.get("/home", isLoggedIn, async (req, res) => {
  const { nom_usu, nom_tipousu } = await getProfileHeader(req.id);

  switch (nom_tipousu) {
    case "Administrador":
      const { count_users } = await getCountUsers();
      const { count_orders} = await getCountOrders();

      res.render("admin/home", {
        nom_usu,
        nom_tipousu,
        count_users,
        count_orders
      });

      break;
    case "Mesero":
      const {count_orders_day} = await getCountOrdersByWaiter(req.id);
      res.render("mesero/home", { nom_usu, nom_tipousu, count_orders_day});
      break;
    case "Cajero":
      pisos = await getPisos();
      res.render("cajero/home", { nom_usu, nom_tipousu, pisos });
      break;
    case "Cocinero":
      const {count_orders_wait} = await getCountOrderWait();
      const {count_orders_prepared} = await getCountOrderPrepared();
      res.render("cocinero/home", { nom_usu, nom_tipousu,count_orders_wait,count_orders_prepared });
      
      break;
  }
  // res.render('home',{nom_usu,nom_tipousu});
});

// Logout
router.get("/logOut", (req, res) => {
  // Limpia la cookie del navegador
  res.clearCookie("jwt");
  return res.redirect("/");
});

// Cambio contraseña
router.get("/change-password", isLoggedIn, async (req, res) => {
  const { nom_usu, nom_tipousu } = await getProfileHeader(req.id);
  res.render("change-password", { nom_usu, nom_tipousu });
});

module.exports = router;
