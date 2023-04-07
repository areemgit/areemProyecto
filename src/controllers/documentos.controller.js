import exl from 'excel4node'
import multer from 'multer';
import {pool} from '../db.js'


export const crearExcelDeuda = async(req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM deudas INNER JOIN unidades_negocio ON deudas.unidad_negocio = unidades_negocio.id INNER JOIN usuarios ON deudas.responsable = usuarios.id_u INNER JOIN clientes ON deudas.cliente = clientes.id INNER JOIN monedas ON deudas.moneda=monedas.id  ORDER BY fecha_sistema DESC;');

        
        //res.json(result)
        var wB = new exl.Workbook();

        var wS= wB.addWorksheet('deuda');

        wS.cell(1, 1).string('Orden')
        wS.cell(1, 2).string('Fecha Sistema')
        wS.cell(1, 3).string('Fecha Venta')
        wS.cell(1, 4).string('Unidad negocio')
        wS.cell(1, 5).string('retraso dias')
        wS.cell(1, 6).string('retraso semanas')
        wS.cell(1, 7).string('responsable')
        wS.cell(1, 8).string('descripcion')
        wS.cell(1, 9).string('cliente')
        wS.cell(1, 10).string('deuda inicial')
        wS.cell(1, 11).string('Pagos')
        wS.cell(1, 12).string('deuda final')
        wS.cell(1, 13).string('Notas')
        wS.cell(1, 14).string('Moneda')

        let b = 1;
        for (let i = 0; i < result.length; i++) {
            let data = result[i];
            b++;
            wS.cell(b, 1).string(data.orden)
            wS.cell(b, 2).string(data.fecha_sistema.toLocaleDateString());
            wS.cell(b, 3).string(data.fecha_venta.toLocaleDateString())
            wS.cell(b, 4).string(data.nombre_u)
            wS.cell(b, 5).number(data.retraso_dias)
            wS.cell(b, 6).number(data.retraso_semanas)
            wS.cell(b, 7).string(data.nombre_usuario)
            wS.cell(b, 8).string(data.descripcion)
            wS.cell(b, 9).string(data.nombre_c)
            wS.cell(b, 10).number(data.deuda_inicial)
            wS.cell(b, 11).number(data.pagos)
            wS.cell(b, 12).number(data.deuda_final)
            wS.cell(b, 13).string(data.notas)
            wS.cell(b, 14).string(data.abreviacion)  
        }  

        // wS.column(1).setWidth(30)

        
        wB.write('deuda.xlsx',res)

    } catch (error) {
        res.json(error)
    }
}

const storage = multer.diskStorage({
    filename: function(res, file, cb){
        const ext = file.originalname.split(".").pop();
        const fileName = Date.now();
        cb(null,`${fileName}.${ext}`);
    },
    destination: function (res, file, cb){
        cb(null, `./src/archivos`)
    },
});

export const upload = multer({storage})

export const crearExcelPago = async(req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM pagos INNER JOIN unidades_negocio ON pagos.unidad_negocio = unidades_negocio.id INNER JOIN usuarios ON pagos.usuario = usuarios.id_u INNER JOIN monedas ON pagos.moneda=monedas.id INNER JOIN formas_pago ON pagos.forma_pago = formas_pago.id ORDER BY id_p DESC;');

        
        //res.json(result)
        var wB = new exl.Workbook();

        var wS= wB.addWorksheet('Pagos');

        wS.cell(1, 1).string('Fecha Sistema')
        wS.cell(1, 2).string('Fecha Pago')
        wS.cell(1, 3).string('Unidad negocio')
        wS.cell(1, 4).string('Orden')
        wS.cell(1, 5).string('Responsable')
        wS.cell(1, 6).string('Pago')
        wS.cell(1, 7).string('Moneda')
        wS.cell(1, 8).string('Forma de pago')
        wS.cell(1, 9).string('Nota de pago')
        wS.cell(1, 10).string('Evidencia')

        let b = 1;
        for (let i = 0; i < result.length; i++) {
            let data = result[i];
            b++;
            wS.cell(b, 1).string(data.fecha_sistema.toLocaleDateString());
            wS.cell(b, 2).string(data.fecha_pago.toLocaleDateString())
            wS.cell(b, 3).string(data.nombre_u)
            wS.cell(b, 4).string(data.orden)
            wS.cell(b, 5).string(data.nombre_usuario)
            wS.cell(b, 6).number(data.pago)
            wS.cell(b, 7).string(data.abreviacion)
            wS.cell(b, 8).string(data.nombre_fp)
            wS.cell(b, 9).string(data.nota_pago)
            wS.cell(b, 10).string(data.archivo)  
        }  

        // wS.column(1).setWidth(30)

        
        wB.write('pagos.xlsx',res)

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}


export const ExcelDeudaVigente = async(req , res) => {
    try {
        const [result] = await pool.query('SELECT * FROM deudas INNER JOIN unidades_negocio ON deudas.unidad_negocio = unidades_negocio.id INNER JOIN clientes ON deudas.cliente = clientes.id INNER JOIN monedas ON deudas.moneda=monedas.id WHERE deuda_final > 0 ORDER BY fecha_sistema DESC;');

        
        //res.json(result)
        var wB = new exl.Workbook();

        var wS= wB.addWorksheet('deuda');

        wS.cell(1, 1).string('Orden')
        wS.cell(1, 2).string('Fecha Sistema')
        wS.cell(1, 3).string('Fecha Venta')
        wS.cell(1, 4).string('Unidad negocio')
        wS.cell(1, 5).string('retraso dias')
        wS.cell(1, 6).string('retraso semanas')
        wS.cell(1, 7).string('responsable')
        wS.cell(1, 8).string('descripcion')
        wS.cell(1, 9).string('cliente')
        wS.cell(1, 10).string('deuda inicial')
        wS.cell(1, 11).string('Pagos')
        wS.cell(1, 12).string('deuda final')
        wS.cell(1, 13).string('Notas')
        wS.cell(1, 14).string('Moneda')

        let b = 1;
        for (let i = 0; i < result.length; i++) {
            let data = result[i];
            b++;
            wS.cell(b, 1).string(data.orden)
            wS.cell(b, 2).string(data.fecha_sistema.toLocaleDateString());
            wS.cell(b, 3).string(data.fecha_venta.toLocaleDateString())
            wS.cell(b, 4).string(data.nombre_u)
            wS.cell(b, 5).number(data.retraso_dias)
            wS.cell(b, 6).number(data.retraso_semanas)
            wS.cell(b, 7).string(data.nombre_usuario)
            wS.cell(b, 8).string(data.descripcion)
            wS.cell(b, 9).string(data.nombre_c)
            wS.cell(b, 10).number(data.deuda_inicial)
            wS.cell(b, 11).number(data.pagos)
            wS.cell(b, 12).number(data.deuda_final)
            wS.cell(b, 13).string(data.notas)
            wS.cell(b, 14).string(data.abreviacion)  
        }  

        // wS.column(1).setWidth(30)

        
        wB.write('deudaVigente.xlsx',res)

    } catch (error) {
        res.json(error)
    }
}