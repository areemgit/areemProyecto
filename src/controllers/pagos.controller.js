import {pool} from '../db.js'

export const getPagos = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM pagos')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createPago = async (req, res) =>{
    const {fecha_sistema, fecha_pago, unidad_negocio, orden, usuario, pago, moneda, forma_pago, nota_pago} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO pagos(fecha_sistema, fecha_pago, unidad_negocio, orden, usuario, pago, moneda, forma_pago, nota_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [fecha_sistema, fecha_pago, unidad_negocio, orden, usuario, pago, moneda, forma_pago, nota_pago])
res.send({
    id: rows.insertId,
    fecha_sistema,
    fecha_pago,
    unidad_negocio,
    orden,
    usuario,
    pago,
    moneda,
    forma_pago,
    nota_pago
})
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getPago = async (req, res) =>{
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM pagos WHERE id = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'pago no encontrado'
    })
    
    res.json(rows[0])
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const deletePago = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM pagos WHERE id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'pago no encontrado'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const updatePago = async(req, res) =>{
    const {id} = req.params
    const {fecha_sistema, fecha_pago, unidad_negocio, orden, usuario, pago, moneda, forma_pago, nota_pago} = req.body

    try {
        const [result] = await pool.query('UPDATE pagos SET fecha_sistema = ?, fecha_pago = ?, unidad_negocio = ?, orden = ?, usuario = ?, pago = ?, moneda = ?, forma_pago = ?, nota_pago = ? WHERE id = ?', [fecha_sistema, fecha_pago, unidad_negocio, orden, usuario, pago, moneda, forma_pago, nota_pago, id])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'pago no encontrado'
    })
    res.json(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}