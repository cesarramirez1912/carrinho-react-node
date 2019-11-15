import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table,InputGroup,Input,Col,Row} from 'reactstrap';
import { FaTrashAlt } from "react-icons/fa";

export class ModalCarrinho extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos:[],
        };
      }


      componentDidMount(){
        this.setState({produtos:this.props.itensCarrinho})
      }

    quantidade = (e,index,numero,op) => {
        let newState = Object.assign(this.state);
        if(op === '+'){
            newState.produtos[index].quantidade = numero+1;
            newState.produtos[index].precoTotal = (newState.produtos[index].quantidade * newState.produtos[index].preco).toFixed(2);
            this.setState(newState);
        }else{
            newState.produtos[index].quantidade = numero-1;
            newState.produtos[index].precoTotal = (newState.produtos[index].quantidade * newState.produtos[index].preco).toFixed(2);
            this.setState(newState);
        }
    }
    

    removerProdutoCarrinho = (e,index) =>{
      let newState = Object.assign(this.state);
      newState.produtos.splice(index,1)
      this.setState(newState);
    }


    render(){
        var itens = this.state.produtos
        let precoTotalVar=0;
        itens.forEach((elemento)=>{
          precoTotalVar=+precoTotalVar+ +elemento.precoTotal;
        });
        return(
        <div>
         <Modal isOpen={this.props.controle} className='modal-lg'>
          <ModalHeader toggle={this.toggle}>Deseja finalizar a compra?</ModalHeader>
          <ModalBody>
          <Table striped>
              <thead>
                <tr>
                    <th>Produto</th>
                    <th>Unitario</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                </tr>
              </thead>
              <tbody>
             {
                 itens.map((item,index)=> (
                        <tr key={index}>
                                   <td>
                                     <h6>{itens[index].descricao}</h6>
                                    </td>
                                   <td>
                                   <h6>{itens[index].preco}</h6>   
                                   </td>
                                   <td>
                                  <Button color="muted"  onClick={event => this.quantidade(event,index,itens[index].quantidade,'+')} size="sm">+</Button>
                                  {itens[index].quantidade}
                                   <Button color="muted"  onClick={event => this.quantidade(event,index,itens[index].quantidade,'')} size="sm">-</Button>
                                   </td>
                                   <td>
                                     <h6>{itens[index].precoTotal}</h6>
                                   </td>
                                   <td>
                                   <Button color="danger" onClick={event => this.removerProdutoCarrinho(event,index)} size="sm"><FaTrashAlt/></Button>
                                   </td>
                                </tr>
                           ))
             }
              <tr>
                                   <td>
                                
                                   </td>
                                   <td>
                              
                                   </td>
                                   <td> 
                                   <h4>Total:</h4>
                                   </td>
                                   <td>
                                   <h4>R$ {precoTotalVar.toFixed(2)}</h4>
                                   </td>
                                   <td>
                                   
                                   </td>
                                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={``}>Finalizar Compra</Button>{' '}
            <Button color="secondary" onClick={event => this.props.mostrarModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
        )
    }
}

export class ModalNovoProduto extends Component {
 
render(){
    return(
    <div>
     <Modal isOpen={this.props.estadoModal} className='modal-lg'>
      <ModalHeader toggle={this.toggle}>Cadastrar/Editar Produto</ModalHeader>
      <ModalBody>
      <Table striped>
          <thead>
            <tr>
                <th>Produto</th>
                <th>Unitario</th>
                <th>Quantidade</th>
                <th>Total</th>
            </tr>
          </thead>
        
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={``}>Finalizar Compra</Button>{' '}
        <Button color="secondary" onClick={event => this.props.eventoModalNovoProduto()}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
    )
}
}

/*  constructor(props){
    super(props);
    this.state = {}
}

trocarInputDescricao(event){
   this.props.eventosTrocarDescricao(event)
}
trocarInputPreco(event){
    this.props.eventosTrocarPreco(event)
}
trocarQuantidade(event){
    this.setState({inputQuantidade:event.target.value})
}

clickEdit = () => {
    fetch('http://localhost:8081/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            id_produto:this.props.controle.inputDefaultId,
            descricao: this.props.controle.inputDefaultDescricao,
            preco: this.props.controle.inputDefaultPreco,
         })
    }).then(
        this.props.produtoEditadoPronto({
            id_produto:this.props.controle.inputDefaultId,
            descricao: this.props.controle.inputDefaultDescricao,
            preco: this.props.controle.inputDefaultPreco,
         }),
        this.cancelCourse(),
        this.props.eventoBotaoEditar(),
        )
}

cancelCourse = () => { 
    document.getElementById("id-form").reset();
  }

  testeBotao = () =>{
      console.log('teste');
  }

render(){
    return (
        <div className="teste">
       <Row className="p-4">
            <Col>
                    <div className="titulo mb-3">
                        <h3 className="text-light">Cadastrar Produto</h3>
                     </div>
                     <h5 className="text-light mb-2">Descricao</h5>
                         <form id="id-form">
                                <InputGroup className="mb-2">
                                    <Input name="desc"  defaultValue={this.props.controle.inputDefaultDescricao} onChange={(event) =>this.trocarInputDescricao(event)} placeholder="Ex: Leite" />
                                </InputGroup>
                                <h5 className="text-light mb-2">Preco</h5>
                                <InputGroup className="mb-2">
                                    <Input name="rs" defaultValue={this.props.controle.inputDefaultPreco} onChange={(event) => this.trocarInputPreco(event)} placeholder="R$" />
                                </InputGroup>
                                <h5 className="text-light">Quantidade</h5>
                                <InputGroup className="mb-2">
                                    <Input name="qntd" defaultValue={this.props.controle.inputDefaultId} onChange={(event)=> this.trocarQuantidade(event)} placeholder="1,2,3.." />
                                </InputGroup>
                                {this.props.controle.botaoCadastrar ? <Button className="w-100 mt-3 bg-success" onClick={(event)=> this.props.eventoAddProduto(event)}>Cadastrar</Button> : <Button className="w-100 mt-3 bg-info" onClick={this.clickEdit}>Atualizar</Button>}
                         </form>
                </Col>
       </Row>
        </div>
      );
    };*/