const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const SalarySchema = new schema({
    Salary:{
        ID: { type:String , required:true},
        Name: { type:String , required:true},
        Designation: { type:String , required:true},
        Month: { type:String , required:true},
        BasicSalary: { type:String , required:true},
        TotalAdditions:[{
            Bonuses: { type:String , required:true},
            HealthInsurance: { type:String , required:true},

        }],
        TotalDeductions:[{
            EmployeeEPF: { type:String , required:true},
           
        }],
        CompanyEPF: { type:String , required:true},
        CompanyETF: { type:String , required:true},
        NetSalary: { type:String , required:true},
        
    }
});
const posts3 =mongoose.model('SalaryPost', SalarySchema);
module.exports = posts3;