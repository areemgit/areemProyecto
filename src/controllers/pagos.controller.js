import {pool} from '../db.js'

export const getPagos = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM pagos INNER JOIN unidades_negocio ON pagos.unidad_negocio = unidades_negocio.id INNER JOIN usuarios ON pagos.usuario = usuarios.id_u INNER JOIN monedas ON pagos.moneda=monedas.id INNER JOIN formas_pago ON pagos.forma_pago = formas_pago.id ORDER BY fecha_sistema DESC;')
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
        console.log(error)
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getPago = async (req, res) =>{
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM pagos WHERE id_p = ?', [id])
    
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

/* export const deletePago = async (req, res)=> {
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
} */

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


export const evidencePago = async(req, res) =>{
    const id = req.params.id
    const {archivo} = req.body
    console.log(archivo, id)
    try {
        const [result] = await pool.query('UPDATE pagos SET archivo = ? WHERE pagos.id_p = ?;', [archivo, id])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'pago no encontrada'
    })
    res.json(204)
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}