import {pool} from '../db.js'

export const getDeudas = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM deudas')
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
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getDeuda = async (req, res) =>{
    const orden = req.params.orden
    try {
        const [rows] = await pool.query('SELECT * FROM deudas WHERE orden = ?', [orden])
    
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

export const deleteDeuda = async (req, res)=> {
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
}

export const updateDeuda = async(req, res) =>{
    const orden = req.params.orden
    const {fecha_sistema, fecha_venta, unidad_negocio, retraso_dias, retraso_semanas, responsable, descripcion, cliente, deuda_inicial, pagos, deuda_final, notas, moneda} = req.body

    try {
        const [result] = await pool.query('UPDATE deudas SET fecha_sistema = ?, fecha_venta = ?, unidad_negocio = ?, retraso_dias = ?, retraso_semanas = ?, responsable = ?, descripcion = ?, cliente = ?, deuda_inicial = ?, pagos= ?, deuda_final = ?, notas = ?, moneda = ? WHERE orden = ?', [fecha_sistema, fecha_pago, unidad_negocio, retraso_dias, retraso_semanas, responsable, descripcion, cliente, deuda_inicial, pagos, deuda_final, notas, moneda, orden])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'deuda no encontrada'
    })
    res.json(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}