import {pool} from '../db.js'

export const getClientes = async (req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM clientes WHERE status_c = 1')
    res.json(result)
    } catch (error) {
        return res.status(505).json({
            message: 'something goes wrong'
        })
    }
}

export const createClientes = async (req, res) =>{
    const {nombre_c, correo_1, correo_2, telefono_1, telefono_2, status_c} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO clientes(nombre_c, correo_1, correo_2, telefono_1, telefono_2, status_c) VALUES (?, ?, ?, ?, ?, ?)', [nombre_c, correo_1, correo_2, telefono_1, telefono_2, status_c])
res.send({
    id: rows.insertId,
    nombre_c,
    correo_1,
    correo_2,
    telefono_1,
    telefono_2,
    status_c
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
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ? AND status_c = 1', [id])
    
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
        const [result] = await pool.query('UPDATE clientes SET status_c = 0 WHERE id = ?', [req.params.id])

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
    const {nombre_c, correo_1, correo_2, telefono_1, telefono_2, status_c} = req.body

    try {
        const [result] = await pool.query('UPDATE clientes SET nombre_c = ?, correo_1 = ?, correo_2 = ?, telefono_1 = ?, telefono_2 = ?, status_c = ? WHERE id = ?', [nombre_c, correo_1, correo_2, telefono_1, telefono_2, status_c, id])

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