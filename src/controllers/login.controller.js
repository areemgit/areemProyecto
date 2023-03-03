import {pool} from '../db.js'
import jwt from 'jsonwebtoken'
import pkg from 'bcryptjs'
import{JWT_SECRETO, JWT_TIEMPO_EXPIRA, JWT_COOKIE_EXPIRES} from '../config.js'

// let passHash = await pkg.hash(contraseña, 8) modificar db varchar 255

export const login = async (req , res) => {
    const {correo, contraseña} = req.body
    // const passH = await pkg.compare(contraseña)
    try {
         const [rows] = await pool.query("SELECT * FROM usuarios WHERE correo = ? AND contraseña =?", [correo, contraseña])
        console.log(rows)
        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'usuario no encontrado'
            })
        } else{
            const id = rows[0].id
            const token = jwt.sign({id:id}, JWT_SECRETO,{
                expiresIn: JWT_TIEMPO_EXPIRA
            })

            const cookiesOptions = {
                expires: new Date(Date.now()+JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            return res.cookie('jwt', token, cookiesOptions)
        } 

    } catch (error) {
        console.log(error)
    }
}