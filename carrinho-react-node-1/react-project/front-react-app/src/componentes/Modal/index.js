import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table,} from 'reactstrap';
import { FaTrashAlt } from "react-icons/fa";

export class ModalCarrinho extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos:[],
        };
      }


      componentDidMount(){
        this.setState({produtos:this.props.controle.itensCarrinho})
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
         <Modal isOpen={this.props.controle.modal} className='modal-lg'>
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