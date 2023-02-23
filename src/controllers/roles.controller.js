import {pool} from '../db.js'

export const getRoles = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM roles')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createRol = async (req, res) =>{
    const {rol, descripcion} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO roles(rol, descripcion) VALUES (?, ?)', [rol, descripcion])
res.send({
    id: rows.insertId,
    rol,
    descripcion,
})
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getRol = async (req, res) =>{
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM roles WHERE id = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'Rol no encontrado'
    })
    
    res.json(rows[0])
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const deleteRol = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM roles WHERE id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Rol no encontrado'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const updateRol = async(req, res) =>{
    const {id} = req.params
    const {rol, descripcion} = req.body

    try {
        const [result] = await pool.query('UPDATE roles SET rol = ?, descripcion = ? WHERE id = ?', [rol, descripcion, id])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'Rol no encontrado'
    })
    res.json(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}