import {pool} from '../db.js'

export const getFPagos = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM formas_pago')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createFPago = async (req, res) =>{
    const {nombre} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO formas_pago(nombre) VALUES (?)', [nombre])
res.send({
    id: rows.insertId,
    nombre
})
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getFPago = async (req, res) =>{
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM formas_pago WHERE id = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'forma de pago no encontrada'
    })
    
    res.json(rows[0])
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const deleteFPago = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM formas_pago WHERE id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'forma de pago no encontrada'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const updateFPago = async(req, res) =>{
    const {id} = req.params
    const {nombre} = req.body

    try {
        const [result] = await pool.query('UPDATE formas_pago SET nombre = ? WHERE id = ?', [nombre, id])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'forma de pago no encontrada'
    })
    res.json(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}