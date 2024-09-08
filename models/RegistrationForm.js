const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
    companyname: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    addressd: {
        type: String,
        required: true
    },
    addressc: {
        type: String,
        required: true
    },
    aadhar: {
        type: String,
        required: true
    },
    pancard: {
        type: String,
        required: true
    },
    passbook: {
        type: String,
        required: true
    },
    voterid: {
        type: String,
        required: true
    },
    companylogo: {
        type: String,
        required: true
    },
    companydocumentation: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});
registrationSchema.index({ userId: 1 });

const RegistrationForm = mongoose.model('RegistrationForm', registrationSchema);

module.exports = RegistrationForm;