import { Router } from "express";
import {crearExcelDeuda, upload, crearExcelPago, ExcelDeudaVigente } from '../controllers/documentos.controller.js'
import multer from "multer";



const router = Router()
router.get('/excelDeuda', crearExcelDeuda)
router.get('/excelVigente', ExcelDeudaVigente)
router.get('/excelPago', crearExcelPago)
router.post('/evidencia', upload.single('myFile'), (req, res)=>{
    const file = req.file.filename;
    res.send({archivo: file});
}   )
export default router