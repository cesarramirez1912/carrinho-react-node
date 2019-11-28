var express = require("express");
var app = express();
const cors = require('cors');
var conexao = require('./conexao');
app.use(cors());
app.options('*',cors());
app.use(express.json());



//inserir uma nova venda
app.post("/novavenda",(req,res)=>{
    let valores = [req.body.total,req.body.id_vendedor];
    let queryInserirVenda = `INSERT INTO tb_venda(data,total,id_vendedor) VALUES(now(),?,?)`;
    if(res.statusCode==200){
        conexao.query(queryInserirVenda,valores,
        (err,rows,fields)=>{
            if(!err){
                res.send(rows);
            }else{
                res.send(err);
            }
        });
    }else{
        res.send("ERRO");
    }
});

//Mostrar todos os itens vendas
app.get("/produtovenda=:id",(req,res)=>{
    conexao.query('SELECT * FROM tb_produtovenda WHERE id_venda=?',req.params.id,function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            res.send(rows)
        }
    });
});

 //Inserir novo produto venda
 app.post("/produtovenda",(req,res)=>{
    let valores = req.body;
    let queryInserirVenda = `INSERT INTO tb_produtovenda (id_produto,valor_unitario,quantidade,id_venda) VALUES ?`;
    if(res.statusCode==200){
        conexao.query(queryInserirVenda,[valores.map(item=>[item.id_produto,item.valor_unitario,item.quantidade,item.id_venda])],
        (err,rows,fields)=>{
            if(!err){
                res.send(rows);
            }else{
                res.send(err);
            }
        });
    }else{
        res.send("ERRO");
    }
});

//todas as vendas
app.get("/vendas",(req,res)=>{
    if(res.statusCode==200){
     conexao.query('SELECT * FROM tb_venda ORDER BY id_venda DESC',function(err,rows,fields){
         if(!err){
            res.send(rows);
         }else{
             res.send(rows)
         }
     });
    }else{
        res.send(res);
    }
 });


//Inserir um novo produto
app.post("/novoproduto",(req,res)=>{
    var param = [
        req.body.id_produto,
        req.body.descricao,
        req.body.preco,
        req.body.quantidade
    ]
    if(res.statusCode==200){
        conexao.query('CALL proc_inserirestoque(?,@ultimo_id)',[param],
        (err,rows,fields)=>{
            if(!err){
               res.send(rows);
            }else{
                res.send(rows);
            }
        });
    }else{
        res.send("ERRO");
    }
});

//Inserir um novo funcionario
app.post("/novofuncionario",(req,res)=>{
    if(res.statusCode==200){
        conexao.query('INSERT INTO tb_funcionario SET ?',[req.body],
        (err,rows,fields)=>{
            if(!err){
               res.send(rows);
            }else{
                res.send(rows);
            }
        });
    }else{
        res.send("ERRO");
    }
});

//Atualizar funcionario pelo id
app.put("/updatefuncionario",(req,res)=>{
    var param = [
        req.body,
        req.body.id_vendedor
    ]
    conexao.query('UPDATE TB_FUNCIONARIO SET ? WHERE id_vendedor = ?',param,
    function(err,rows,fields){
        if(!err){
           res.send(rows); 
        }else{
            res.send(rows);
        }
    });
});

//deletar um produto
app.delete("/deletarfuncionario",(req,res)=>{
    conexao.query('DELETE FROM TB_FUNCIONARIO WHERE id_vendedor =?',[req.body.id],function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            res.send(rows);
        }
    });
});


//Mostrar todos os funcionarios
app.get("/funcionarios",(req,res)=>{
    conexao.query('SELECT * FROM TB_FUNCIONARIO ORDER BY id_vendedor DESC',function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            res.send(rows)
        }
    });
});


app.get("/vendedores",(req,res)=>{
    conexao.query('SELECT * FROM TB_FUNCIONARIO WHERE cargo LIKE "%Vendedor%" ORDER BY id_vendedor DESC',function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            res.send(rows)
        }
    });
});

//Mostrar todos os produtos
app.get("/produtos",(req,res)=>{
    conexao.query('SELECT * FROM tb_produto,tb_estoque WHERE tb_estoque.id_produto = tb_produto.id_produto ORDER BY tb_produto.id_produto DESC',function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            res.send(rows)
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
            res.send(rows); 
        }
    });
});

//deletar um produto
app.delete("/deletar",(req,res)=>{
    conexao.query('DELETE FROM TB_PRODUTO WHERE id_produto =?',[req.body.id],function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            res.send(rows);
        }
    });
});

//Mostrar estoque produtos
app.get("/estoques",(req,res)=>{
    conexao.query('SELECT id_estoque,tb_produto.id_produto,descricao,quantidade FROM tb_estoque,tb_produto where tb_estoque.id_produto=tb_produto.id_produto order by tb_produto.id_produto DESC',function(err,rows,fields){
        if(!err){
           res.send(rows);
        }else{
            res.send(rows);
        }
    });
});

//Criar um novo estoque para produto
app.post("/novoestoque",(req,res)=>{
    if(res.statusCode==200){
        conexao.query('INSERT INTO tb_estoque SET ?',[req.body],
        (err,rows,fields)=>{
            if(!err){
               res.send(rows);
            }else{
                res.send(rows);
            }
        });
    }else{
        res.send("ERRO");
    }
});

app.listen(8081,function(){
    console.log('Servidor rodando na porta 8081');
});