const { connect, connection } = require('mongoose');

const url = 'mongodb://aurelien:Prout123.!@172.31.39.152:27017/ambriadb?authSource=admin?replicaSet=rs0';

connect(
    url, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }
);

connection.once('open', () => console.log(`Connected to mongo at ${url}`)); 