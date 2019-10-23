import React,{Component} from 'react';
import './App.css';
import {Header} from './componentes/Header';
import {MostrarProdutos, FormularioProduto} from './componentes/Produto';
import { Row,Col } from 'react-bootstrap';


class App extends Component {

  constructor(){
    super();
    this.state = {
      novoProduto:{},
      produtos:[],
      produtoEditado:{
        id_produto:'',
        descricao:'',
        preco:''
      },
      botaoCadastrar: true,
      inputDefaultDescricao:'',
      inputDefaultPreco:'',
      inputDefaultId:'',
      indexEditado:'',
      booleano:false,
      itensCarrinho:0,
    }
  }

  componentDidMount(){
    fetch('http://localhost:8081/produtos')
    .then(response => response.json())
    .then(produtos=>{
        this.setState({produtos:produtos})
    })
    .catch(e=> console.log(e));
}

eventoAddProduto = (e) => {
  e.preventDefault();
  fetch('http://localhost:8081/novoproduto', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
     },
     body: JSON.stringify({
        descricao: this.state.inputDefaultDescricao,
        preco: this.state.inputDefaultPreco,
      })
  })
  .then(res => res.json()
  .then(json => {
    var produto={
      id_produto:json.insertId,
      descricao: this.state.inputDefaultDescricao,
      preco: this.state.inputDefaultPreco,
    };
    var arrayTemporario = this.state.produtos;
    arrayTemporario.unshift(produto)
    this.setState({
      produtos:arrayTemporario
    });
    this.eventoSetState()
    document.getElementById("id-form").reset();
  }
  ))
}

eventoEditarProduto = (dadosEditaveis) => {
  this.setState({
    indexEditado:dadosEditaveis.index,
    inputDefaultId:dadosEditaveis.id_produto,
    inputDefaultDescricao:dadosEditaveis.descricao,
    inputDefaultPreco:dadosEditaveis.preco,})
  this.eventoBotaoFormularioEdicao()
}

eventoAddCarrinho = (e) => {
  this.setState({itensCarrinho:this.state.itensCarrinho+1})
}

produtoEditadoPronto = (data) => {
  var arrayTemporario = this.state.produtos;
  arrayTemporario[this.state.indexEditado] = data;
  this.setState({
    produtos:arrayTemporario
  })
  this.eventoSetState()
}

eventoRemoveProduto = (id,index) => {
  fetch('http://localhost:8081/deletar', {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
     },
     body: JSON.stringify({
        id_produto: id,
      })
  })
  .then(res => res.json()
  .then(json => {
    this.setState({
      produtos: this.state.produtos.filter((e,i) =>{
        return i!==index
      })
    });
  }
  ))
}

  trocarInputDescricao(event){
    this.setState({inputDefaultDescricao:event.target.value})
  }

  trocarInputPreco(event){
   this.setState({inputDefaultPreco:event.target.value})
  }

  trocarQuantidade(event){
    this.setState({inputDefaultId:event})
  }

  eventoBotaoFormulario = (dadosFormulario) =>{
    this.setState({novoProduto:dadosFormulario})
  }

  eventoSetState = () => {
    this.setState({
      inputDefaultDescricao:'',
      inputDefaultPreco:'',
      inputDefaultId:'',
    })
  }

  eventoBotaoFormularioEdicao = () => {
    this.setState({
      botaoCadastrar:false,
    })
  }

  render(){
    return (
    <div className="App container-fluid">
      <Row>
         <Col md="3" className="cor-col-vh min-vh-100">
         <FormularioProduto eventoAddProduto={this.eventoAddProduto} produtoEditadoPronto={this.produtoEditadoPronto} controle={this.state} eventoSetState={this.eventoSetState.bind(this)} eventoBotaoEditar={this.eventoBotaoFormularioEdicao} eventosTrocarDescricao={this.trocarInputDescricao.bind(this)}  eventosTrocarPreco={this.trocarInputPreco.bind(this)}/>
        </Col>
        <Col md="9">
            <Row>
               <Col className="mb-3 p-0">
                <Header title="Produtos" itensCarrinho={this.state.itensCarrinho}/>
              </Col>
          </Row>
          <Row>
            <Col>
            <MostrarProdutos eventoAddCarrinho={this.eventoAddCarrinho} eventoRemoveProduto={this.eventoRemoveProduto} eventoEditarProduto={this.eventoEditarProduto} controls={this.state.novoProduto} controle={this.state} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    );
  }

}

export default App;
