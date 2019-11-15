import React,{Component} from 'react';
import './style.css';
import {MostrarProdutos} from '../Produto/componentes-produto/ComponentesProduto';
import {ModalCarrinho, ModalNovoProduto} from '../Modal';
import {Col,Button,Row} from 'react-bootstrap';



export class Produto extends Component {

  constructor(props){
    super(props);
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
      itensCarrinho:[],
      boolModalNovoProduto:false,
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

eventoModalNovoProduto = () => {
    this.setState({
        boolModalNovoProduto:!this.state.boolModalNovoProduto
    })
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


eventoAddCarrinho = (e,items) => {
  
  var arrayTemporario = this.state.itensCarrinho;
  var valorTemporario = items.quantidade;
  arrayTemporario.push(items);
  arrayTemporario.forEach((item,index)=>{
    if(item.descricao!==items.descricao){
     
    }else{
      valorTemporario = arrayTemporario[index].quantidade;
      arrayTemporario[index].quantidade=valorTemporario+1;
      item.precoTotal=item.quantidade*item.preco;
      item.precoTotal = item.precoTotal.toFixed(2);
      if(valorTemporario!==0){
        arrayTemporario.pop();
      }
    }
  })
  this.props.eventoQuantidadeCarrinho(arrayTemporario.length);
  this.setState({itensCarrinho:arrayTemporario})
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
      botaoCadastrar:!this.state.botaoCadastrar,
    })
  }
  

  render(){
    return (
        <Col>
           <Row className='mb-2 ml-1'>
           <Button onClick={event => this.eventoModalNovoProduto()}><h2 className="text-light m-0 p-0">{' '}</h2>Novo Produto</Button>
           </Row>
            <MostrarProdutos eventoAddCarrinho={this.eventoAddCarrinho} eventoRemoveProduto={this.eventoRemoveProduto} eventoEditarProduto={this.eventoEditarProduto} controls={this.state.novoProduto} controle={this.state} />
            <ModalCarrinho controle={this.props.estadoModalCarrinho}  mostrarModal={this.props.mostrarModal} itensCarrinho={this.state.itensCarrinho}/>
            <ModalNovoProduto estadoModal={this.state.boolModalNovoProduto} eventoModalNovoProduto={this.eventoModalNovoProduto}/>
       </Col>
    );
  }

}

