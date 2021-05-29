const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config()

const connection = mongoose.createConnection(process.env.DB_CONNECTION);

autoIncrement.initialize(connection);


const ReportSchema = new Schema({
    concept: {
        type: String,
        required:true
    },
    dateFrom: {
        type: {
            year: String,
            month: String,
            day: String  
        },
        required: true
    },
    dateTo:{
        type: {
            year: String,
            month: String,
            day: String  
        },
        required: true
    },
    employeeName:{
        type: String,
        required: true
    },
    employeePosition:{
        type:String,
        required: true
    },
    employeeDepartment:{
        type:String,
        required: true
    },
    employeeSupervisor:{
        type:String,
        required: true
    },
    items:{
        type:[
            {
                date: {
                    year: String,
                    month: String,
                    day: String  
                },
                accountName:{
                    type: String
                },
                description:{
                    type: String
                },
                totalItem:{
                    type: Number
                }
            }
        ],
        required: true
    },
    totalAmount:{
        type: Number,
        required: true
    },
    approvedBy:{
        type: String,
        required: true
    },
    createdBy:{
        type: String
    }
},{timestamps : true})


ReportSchema.plugin(autoIncrement.plugin, 'Report');

module.exports = mongoose.model('Report',ReportSchema);