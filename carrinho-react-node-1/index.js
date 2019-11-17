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

//Inserir um novo produto
app.post("/novoproduto",(req,res)=>{
    if(res.statusCode==200){
        conexao.query('INSERT INTO tb_produto SET ?',[req.body],
        (err,rows,fields)=>{
            if(!err){
               res.send(rows);
            }else{
                console.log(err);
            }
        });
    }else{
        res.send("ERRO");
    }
});

//Mostrar todos os funcionarios
app.get("/funcionarios",(req,res)=>{
    conexao.query('SELECT * FROM TB_FUNCIONARIO ORDER BY id_vendedor DESC',function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            console.log(err);
        }
    });
});

//Mostrar todos os produtos
app.get("/produtos",(req,res)=>{
    conexao.query('SELECT * FROM TB_PRODUTO ORDER BY id_produto DESC',function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            console.log(err);
        }
    });
});

//Atualizar produto pelo id
app.put("/update",(req,res)=>{
    var param = [
        req.body,
        req.body.id_produto
    ]
    conexao.query('UPDATE TB_PRODUTO SET ? WHERE id_produto = ?',param,
    function(err,rows,fields){
        if(!err){
           res.send(rows); 
        }else{
            console.log(err);
        }
    });
});

//deletar um produto
app.delete("/deletar",(req,res)=>{
    conexao.query('DELETE FROM TB_PRODUTO WHERE id_produto =?',[req.body.id_produto],function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            console.log(err);
        }
    });
});

//Mostrar estoque produtos
app.get("/estoques",(req,res)=>{
    conexao.query('SELECT * FROM tb_estoque,tb_produto where tb_estoque.id_produto=tb_produto.id_produto',function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            console.log(err);
        }
    });
});

app.listen(8081,function(){
    console.log('Servidor rodando na porta 8081');
});