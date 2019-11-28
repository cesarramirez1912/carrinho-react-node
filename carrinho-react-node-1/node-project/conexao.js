var express = require("express");
var app = express();
const cors = require('cors');
app.use(cors());
app.options('*',cors());

const mysql = require("mysql");
var conexao = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'12345',
    database: 'sistema_venda'
});
app.use(express.json());

conexao.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log('conectado');
    }
});
module.exports = conexao;