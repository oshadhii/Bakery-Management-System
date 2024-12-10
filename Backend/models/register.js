const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    employeeRegister:{
        EmployeeID: {
            type: String,
            require: true,
            unique: true,
        },
        NameWithInitials: {
            type: String,
            require: true,
            unique: true,
        },
        Address: String,
        PhoneNumber: String,
        JoinedDate: String,
        Designation: String,
        BasicSalary: String,
        Email: String,


    }
});
const posts =mongoose.model('register', empSchema);
module.exports = posts;
   