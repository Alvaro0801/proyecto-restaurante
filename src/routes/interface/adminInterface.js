const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const router = Router();

router.get("/categorias", isLoggedIn,(req, res) => {
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render("admin/categorias",{nom_usu,nom_tipousu});
});
//Interfaz registro usuarios
router.get('/register-user',isLoggedIn,async(req,res)=>{
  const {nom_usu,nom_tipousu}= await getProfileHeader(req.id);
  res.render('admin/registerUser',{nom_usu,nom_tipousu});
})
//Interfaz vista registro usuarios
router.get('/Users',isLoggedIn,async(req,res)=>{
  const {nom_usu,nom_tipousu}= await getProfileHeader(req.id);
  res.render('admin/adminUsers',{nom_usu,nom_tipousu});
})


router.get("/mesas", isLoggedIn,(req, res) => {
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render("admin/mesas",{nom_usu,nom_tipousu});
});


module.exports=router