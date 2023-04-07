import {pool} from '../db.js'

export const getDeudas = async (req , res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM deudas INNER JOIN unidades_negocio ON deudas.unidad_negocio = unidades_negocio.id INNER JOIN clientes ON deudas.cliente = clientes.id INNER JOIN monedas ON deudas.moneda=monedas.id WHERE deuda_final > 0 ORDER BY fecha_sistema DESC;')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}


export const createDeuda = async (req, res) =>{
    const {orden, fecha_sistema, fecha_venta, unidad_negocio, retraso_dias, retraso_semanas, responsable, descripcion, cliente, deuda_inicial, pagos, deuda_final, notas, moneda} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO deudas(orden, fecha_sistema, fecha_venta, unidad_negocio, retraso_dias, retraso_semanas, responsable, descripcion, cliente, deuda_inicial, pagos, deuda_final, notas, moneda) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [orden, fecha_sistema, fecha_venta, unidad_negocio, retraso_dias, retraso_semanas, responsable, descripcion, cliente, deuda_inicial, pagos, deuda_final, notas, moneda])
res.send({
    orden,
    fecha_sistema,
    fecha_venta,
    unidad_negocio,
    retraso_dias,
    retraso_semanas,
    responsable,
    descripcion,
    cliente,
    deuda_inicial,
    pagos,
    deuda_final, 
    notas,
    moneda
})
    } catch (error) {
        console.log(error)
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getDeuda = async (req, res) =>{
    const orden = req.params.orden
    try {
        const [rows] = await pool.query('SELECT * FROM deudas INNER JOIN unidades_negocio ON deudas.unidad_negocio = unidades_negocio.id INNER JOIN clientes ON deudas.cliente = clientes.id INNER JOIN monedas ON deudas.moneda=monedas.id INNER JOIN usuarios ON deudas.responsable = usuarios.id_u WHERE orden = ?', [orden])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'deuda no encontrada'
    })
    
    res.json(rows[0])
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

/* export const deleteDeuda = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM deudas WHERE orden = ?', [req.params.orden])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'deuda no encontrada'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
} */

export const updateDeuda = async(req, res) =>{
    const orden = req.params.orden
    const {fecha_sistema, fecha_venta, unidad_negocio, retraso_dias, retraso_semanas, responsable, descripcion, cliente, deuda_inicial, pagos, deuda_final, notas, moneda} = req.body

    try {
        const [result] = await pool.query('UPDATE deudas SET fecha_sistema = ?, fecha_venta = ?, unidad_negocio = ?, retraso_dias = ?, retraso_semanas = ?, responsable = ?, descripcion = ?, cliente = ?, deuda_inicial = ?, pagos= ?, deuda_final = ?, notas = ?, moneda = ? WHERE orden = ?', [fecha_sistema, fecha_venta, unidad_negocio, retraso_dias, retraso_semanas, responsable, descripcion, cliente, deuda_inicial, pagos, deuda_final, notas, moneda, orden])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'deuda no encontrada'
    })
    res.json(204)
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}


export const sumarPago = async(req, res) =>{
    const orden = req.params.orden
    const {pago} = req.body

    try {
        const [result] = await pool.query(`UPDATE deudas SET pagos = pagos+${pago} WHERE orden = ?`, orden)

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'deuda no encontrada'
    })
    res.json(204)
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const  restarDeuda = async(req, res) =>{
    const orden = req.params.orden
    /* const {pago} = req.body */

    try {
        const [result] = await pool.query(`UPDATE deudas SET deuda_final = deuda_inicial-pagos WHERE orden = ?`, orden)

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'deuda no encontrada'
    })
    res.json(204)
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const  retrasoDias = async(req, res) =>{
    try {
        const [result] = await pool.query( 'SELECT * FROM deudas')
        if(result){
            for (let index = 0; index < result.length; index++) {
                const fechaV = result[index].fecha_venta;
                let data = result[index]
                let fecha_hoy = new Date();
            let diferencia = (fecha_hoy - fechaV)/(1000*60*60*24);
            let retrasoDias = Math.floor(diferencia)
            const [row] = await pool.query(`UPDATE deudas SET retraso_dias = ${retrasoDias} WHERE orden = ?`, data.orden)
            }
            res.json(204)
        }
        
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const  retrasoSemanas = async(req, res) =>{
    try {
        const [result] = await pool.query( 'SELECT * FROM deudas')
        if(result){
            for (let index = 0; index < result.length; index++) {
                const retraso = result[index].retraso_dias;
                let data = result[index]
            let diferencia = retraso/7;
            let retrasoSem = Math.floor(diferencia)
            const [row] = await pool.query(`UPDATE deudas SET retraso_semanas = ${retrasoSem} WHERE orden = ?`, data.orden)
            }
            res.json(204)
        }
        
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}
