const statsServices = require("../services/statsServices");

const pedMes = async (req, res) => {
  
  try {
    const { params: {dato},}=req;
    var fecha = new Date("'"+req.params.dato+"'");
    var mes=fecha.getMonth()+1;
    var anio=fecha.getFullYear();
    arrayfecha=[mes,anio];
    const stats_=await statsServices.pedMes(arrayfecha);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const pedBimes=async(req,res)=>{
  try{
    const { params: {dato},}=req;
    var fecha = new Date("'"+req.params.dato+"'");
    var mes=fecha.getMonth()+1;
    var anio=fecha.getFullYear();
    
    if(mes-3<1){
      var preanio=anio-1;
      var premes=12+mes-3;
    }
    else{
      var preanio=anio;
      var premes=mes-3;
    }
    
    let dia=new Date(anio,mes,0);
    fecha=new Date("'"+anio+"-"+mes+"-"+dia.getDate()+"'");
    var prefecha=new Date("'"+preanio+"-"+premes+"-"+1+"'")
    arrayfecha=[prefecha,fecha];
    const stats_=await statsServices.pedBimes(arrayfecha);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }

};
const catMes = async (req, res) => {
  const { params: {dato},}=req;
  try {
    var fecha = new Date("'"+req.params.dato+"'");
    var mes=fecha.getMonth()+1;
    var anio=fecha.getFullYear();
    arrayfecha=[mes,anio];
    const stats_=await statsServices.catMes(arrayfecha);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const pedDia = async (req, res) => {
  const { params: {dato},}=req;
  try {
    const stats_=await statsServices.pedDia(req.params.dato);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const catDia = async (req, res) => {
  const { params: {dato},}=req;
  try {
    const stats_=await statsServices.catDia(req.params.dato);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const pedBiDia=async(req,res)=>{
  try{
    const { params: {dato},}=req;
    var fecha = new Date("'"+req.params.dato+"'");
    console.log(req.params.dato)
    var mes=fecha.getMonth()+1;
    var anio=fecha.getFullYear();
    var dia=fecha.getdate();
    if(dia-3<1){
      var preanio=anio-1;
      var premes=12+mes-1;
      let diaAux=new Date(anio,mes,0);
      var preDia=diaAux+dia-3;
    }
    else{
      var preanio=anio;
      var premes=mes;
      var preDia=dia-3;
    }
    var prefecha=new Date("'"+preanio+"-"+premes+"-"+preDia+"'");
    console.log(prefecha)
    var arrayfecha=[prefecha,fecha];
    const stats_=await statsServices.pedBiDia(arrayfecha);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }

};
module.exports = {
  pedMes,
  pedDia,
  catDia,
  catMes,
  pedBimes,
  pedBiDia
};