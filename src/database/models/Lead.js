const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { email } = require('./../../helpers/validators');

const LeadSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    fname: {
        type: String,
        trim: true
    },
    lname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        validate: {
            validator: str => email(str),
            message: props => `${props.value} is not a valid email!`
        },
    },
    companyLocation: String,
    companyId: String,
    companySize: String,
    companyIndustry: String,
    companyName: String,
    title: {
        type: String,
        trim: true
    },
    startedOn: String,
    phoneNumber: Array
});

const Lead = model('lead', LeadSchema); 

module.exports = Lead;