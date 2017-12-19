const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
    info: { type: mongoose.Schema.Types.String, required: true },
    contacts: { 
        office: {
            address: String,
            phoneNumber: String,
            fax: String,
            email: String
        } ,
        factory: {
            address: String,
            phoneNumber: String
        }
     },    
});


const CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema);



module.exports = CompanyInfo;
