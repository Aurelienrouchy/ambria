const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const { Schema, model } = mongoose;

const { email } = require('./../../helpers/validators');

const UserSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    providerId: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
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
    favorites: {
        type: [ String ],
        default: undefined
    },
});

// Model Methods
// UserSchema.methods.generateJWT = (token) => {
//     return jwt.sign({token}, process.env.JWT_KEY || 'Prout123')
// };

const User = model('user', UserSchema); 

module.exports = User;