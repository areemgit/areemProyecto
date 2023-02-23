import {pool} from '../db.js'

export const getClientes = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM clientes')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createClientes = async (req, res) =>{
    const {nombre, correo_1, correo_2, telefono_1, telefono_2} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO clientes(nombre, correo_1, correo_2, telefono_1, telefono_2) VALUES (?, ?, ?, ?, ?)', [nombre, correo_1, correo_2, telefono_1, telefono_2])
res.send({
    id: rows.insertId,
    nombre,
    correo_1,
    correo_2,
    telefono_1,
    telefono_2
})
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const getCliente = async (req, res) =>{
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'cliente no encontrado'
    })
    
    res.json(rows[0])
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const deleteClientes = async (req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'cliente no encontrado'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const updateClientes = async(req, res) =>{
    const {id} = req.params
    const {nombre, correo_1, correo_2, telefono_1, telefono_2} = req.body

    try {
        const [result] = await pool.query('UPDATE clientes SET nombre = ?, correo_1 = ?, correo_2 = ?, telefono_1 = ?, telefono_2 = ? WHERE id = ?', [nombre, correo_1, correo_2, telefono_1, telefono_2, id])

    if(result.affectedRows === 0) return res.status(404).json({
        message : 'cliente no encontrado'
    })
    res.json(204)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}