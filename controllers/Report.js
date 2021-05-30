
const Report = require('../models/Report')

module.exports.add = async (req,res,next) =>{
    const report = new Report(req.body);
    try{
        await report.save()
        res.send('Reporte guardado exitosamente')
    }catch(err){
        next(err)
    }
}

module.exports.getAll = async (req,res,next) =>{
    let reports = [] 
    try{
        reports = await Report.find({})
        res.send(reports)
    }catch(err){
        next(err)
    }
}

module.exports.getByID = async (req,res,next) =>{
    const {ID} = req.params;
    let report
    try{
        report = await Report.findById(ID)
        if(!report){
            throw 'ID de reporte no existente'
        }
        res.send(report)
    }catch(err){
        next(err)
    }
}


module.exports.search = async (req,res,next) =>{
    const { query,field } = req.query;
    let querySearch = {}
    querySearch[field] = {'$regex': query,$options:'i'}
    let reports = []
    try{
        reports = await Report.find(querySearch)
        res.send(reports)
    }catch(err){
        next(err)
    }

}

module.exports.delete = async (req,res,next) =>{
    const { ID } = req.params;
    try{
        const report = await Report.findOneAndDelete({_id:ID})
        if(!report){
            throw 'ID de reporte no existente'
        }
        res.send('Registro eliminado exitosamente')
    }catch(err){
        next(err)
    }
}

module.exports.update = async (req,res,next) =>{
    const { ID } = req.params;
    const newReport = req.body;
    try{
        const report = await Report.findByIdAndUpdate(ID,newReport)
        if(!report){
            throw 'ID de reporte no existente'
        }
        res.send('Reporte actualizado exitosamente')
    }catch(err){
        next
    }
}