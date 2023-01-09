const con = require("../config/bd");

    const getCountPays = async () => {
        const countPays = await con.query("SELECT COUNT(*) AS count_pays FROM pago");
        return countPays[0];
    };
    
    const getPays = async () => {
        const pays = await con.query("SELECT * FROM pago");
      
        if (!pays) throw new Error();
        return pays;
    };
    
    const getPay = async (id_pago) => {
        const pay = await con.query("SELECT * FROM pago WHERE id_pago = ?",id_pago);
        if (!pay) throw new Error();
        return pay;
    };

    const createPay = async (id_mpago, id_ped, fecha_pago, total_pago) => {
        const pay = await con.query("INSERT INTO pago (`id_mpago`, `id_ped`, `fecha_pago`, `total_pago`) VALUES ('?', '?', '?', '?')",id_ped, id_mpago, fecha_pago, total_pago);
        if (!pay) throw new Error();
        return pay;
    };
      
module.exports = {
    getCountPays,
    getPays,
    getPay,
    createPay
}