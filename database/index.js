const { connect, connection } = require('mongoose');

const url = 'mongodb://aurelien:Prout123.!@ec2-35-180-114-46.eu-west-3.compute.amazonaws.com:27017/ambriadb?authSource=admin?replicaSet=rs0';

connect(
    url, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }
);

connection.once('open', () => console.log(`Connected to mongo at ${url}`));