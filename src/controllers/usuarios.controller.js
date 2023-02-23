import {pool} from '../db.js'

export const getUsuarios = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createUsuario = async (req, res) =>{
    const {nombre, correo, contraseña, tipo_usuario} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO usuarios(nombre, correo, contraseña, tipo_usuario) VALUES (?, ?, ?, ?)', [nombre, correo, contraseña, tipo_usuario])
res.send({
    id: rows.insertId,
    nombre,
    correo,
    contraseña,
    tipo_usuario,
})
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getUsuario = async (req, res) =>{
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })
    
    res.json(rows[0])
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const deleteUsuario = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'usuario no encontrado'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const updateUsuario = async(req, res) =>{
    const {id} = req.params
    const {nombre, correo, contraseña, tipo_usuario} = req.body

    try {
        const [result] = await pool.query('UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ?, tipo_usuario = ? WHERE id = ?', [nombre, correo, contraseña, tipo_usuario, id])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'usuario no encontrado'
    })
    res.json(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}