import {pool} from '../db.js'
import pkg from 'bcryptjs'

export const getUsuarios = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios INNER JOIN roles ON usuarios.tipo_usuario = roles.id WHERE status_u = 1')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createUsuario = async (req, res) =>{
    const {nombre_usuario, correo, contrasenia, tipo_usuario, status_u} = req.body
    let passHash = await pkg.hash(contrasenia, 8)
    try {
        const [rows] = await pool.query('INSERT INTO usuarios(nombre_usuario, correo, contrasenia, tipo_usuario, status_u) VALUES (?, ?, ?, ?, ?)', [nombre_usuario, correo, passHash, tipo_usuario, status_u])
res.send({
    id: rows.insertId,
    nombre_usuario,
    correo,
    contrasenia,
    tipo_usuario,
    status_u
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
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_u = ? AND status_u = 1', [id])
    
    if (rows.length <= 0) {
        return res.status(404).json({
        message: 'Usuario no encontrado'
    })
}
    
    res.json(rows[0])
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const deleteUsuario = async (req, res)=> {
    try {
        const [result] = await pool.query('UPDATE usuarios SET status_u = 0 WHERE id_u = ?', [req.params.id])

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
    const {nombre_usuario, correo, contrasenia, tipo_usuario, status_u} = req.body

    try {
        const [result] = await pool.query('UPDATE usuarios SET nombre_usuario = ?, correo = ?, contrasenia = ?, tipo_usuario = ?, status_u = ? WHERE id_u = ?', [nombre_usuario, correo, contrasenia, tipo_usuario, status_u, id])

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