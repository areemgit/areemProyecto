import {pool} from '../db.js'

export const getMonedas = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM monedas')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createMoneda = async (req, res) =>{
    const {nombre, abreviacion} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO monedas(nombre, abreviacion) VALUES (?, ?)', [nombre, abreviacion])
res.send({
    id: rows.insertId,
    nombre,
    abreviacion,
})
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getMoneda = async (req, res) =>{
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM monedas WHERE id = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'Moneda no encontrada'
    })
    
    res.json(rows[0])
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const deleteMoneda = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM monedas WHERE id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Moneda no encontrada'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const updateMoneda = async(req, res) =>{
    const {id} = req.params
    const {nombre, abreviacion} = req.body

    try {
        const [result] = await pool.query('UPDATE monedas SET nombre = ?, abreviacion = ? WHERE id = ?', [nombre, abreviacion, id])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'Moneda no encontrada'
    })
    res.json(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}