import {pool} from '../db.js'

export const getFPagos = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM formas_pago WHERE status_fp = 1')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createFPago = async (req, res) =>{
    const {nombre_fp, status_fp} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO formas_pago(nombre_fp, status_fp) VALUES (?, ?)', [nombre_fp, status_fp])
res.send({
    id: rows.insertId,
    nombre_fp,
    status_fp
})
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getFPago = async (req, res) =>{
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM formas_pago WHERE id = ? AND status_fp = 1', [id])
    
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
        const [result] = await pool.query('UPDATE formas_pago SET status_fp = 0 WHERE id = ?', [req.params.id])

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
    const {nombre_fp, status_fp} = req.body

    try {
        const [result] = await pool.query('UPDATE formas_pago SET nombre_fp = ?, status_fp = ? WHERE id = ?', [nombre_fp, status_fp, id])

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