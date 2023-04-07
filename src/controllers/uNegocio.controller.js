import {pool} from '../db.js'

export const getUNegocios = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM unidades_negocio WHERE status_un = 1')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createUNegocio = async (req, res) =>{
    const {nombre_u, localizacion, status_un} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO unidades_negocio(nombre_u, localizacion, status_un) VALUES (?, ?, ?)', [nombre_u, localizacion, status_un])
res.send({
    id: rows.insertId,
    nombre_u,
    localizacion,
    status_un
})
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getUNegocio = async (req, res) =>{
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM unidades_negocio WHERE id = ? AND status_un = 1', [id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'unidad de negocio no encontrado'
    })
    
    res.json(rows[0])
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const deleteUNegocio = async (req, res)=> {
    try {
        const [result] = await pool.query('UPDATE unidades_negocio SET status_un = 0 WHERE id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'unidad de negocio no encontrado'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const updateUNegocio = async(req, res) =>{
    const {id} = req.params
    const {nombre_u, localizacion, status_un} = req.body

    try {
        const [result] = await pool.query('UPDATE unidades_negocio SET nombre_u = ?, localizacion = ?, status_un = ? WHERE id = ?', [nombre_u, localizacion, status_un, id])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'unidad de negocio no encontrado'
    })
    res.json(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}