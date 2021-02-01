const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const FavoriteSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 0,
    },
    price: Number,
    name: {
        type: String,
        required: true 
    },
    count: {
        type: Number,
        min: 0,
        required: true
    },
    leads: {
        type: [ String ],
        default: undefined
    },
    fname: {
        type: String,
        trim: true
    },
    lname: {
        type: String,
        trim: true
    },
    companyLocation: String,
    companyId: String,
    companySize: String,
    companyIndustry: String,
    companyName: String,
    title: {
        type: String,
        trim: true
    }
});

const Favorite = model('favorite', FavoriteSchema); 

module.exports = Favorite;