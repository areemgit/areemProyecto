import {pool} from '../db.js'
import jwt from 'jsonwebtoken'
import pkg from 'bcryptjs'
import{JWT_SECRETO, JWT_TIEMPO_EXPIRA, JWT_COOKIE_EXPIRES} from '../config.js'

export const login = async (req , res) => {
    const {correo, contraseña} = req.body
    
    try {
         const [rows] = await pool.query("SELECT * FROM usuarios WHERE correo = ? AND status_u =1", [correo])
        const pass = await pkg.compare(contraseña, rows[0].contrasenia )
        console.log(pass)

        if (pass) {
            
            const id = rows[0].id
        const token = jwt.sign({id:id}, JWT_SECRETO,{
            expiresIn: JWT_TIEMPO_EXPIRA
        })

        const cookiesOptions = {
            expires: new Date(Date.now()+JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.json({
            ok: true,
            text: 'login correcto',
            token,
            data:rows[0]
        })

        } else {
            res.status(404).json({
                message: 'Usuario no encontrado'
            })
        } 

    } catch (error) {
        res.json(error)
    }
}


export const logout = ()=>{
    res.clearCookie('jwt');
}
