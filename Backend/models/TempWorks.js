const mongoose = require('mongoose');

const TempSchema = new mongoose.Schema({
    Tempory: {
        EmployeeID: {
            type: String,
            required: true,
            unique: true,
        },
        Date: {
            type: String,
            required: true,
        },
        NameWithInitials: {
            type: String,
            required: true,
            unique: true,
        },
        PhoneNumber: {
            type: String,
            required: true,
        },
        AssignedTask: {
            type: String,
            required: true,
        },
        AssignedDate: {
            type: String,
        },
        EmployeeEmail: {
            type: String,
            required: true,
        },
    }
});

const posts2 = mongoose.model('TempWorks', TempSchema);
module.exports = posts2;
