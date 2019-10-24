import React, {Component} from 'react';
import { Button,Table,InputGroup,Input,Col,Row} from 'reactstrap';
import './style.css';
import { FaCartPlus,FaEdit,FaTrashAlt } from "react-icons/fa";

export class MostrarProdutos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editaVel:{},
            defaultDescricao:'',
            defaultPreco:'',
            defaultId:'',
            indexEditado:''
        }
    }

    render(){
        var items = this.props.controle.produtos;
        return (
            <Table striped className="estilo-tabela">
              <thead className="bg-dark text-white">
                <tr>
                    <th>ID</th>
                    <th>DESCRICAO</th>
                    <th>PRECO</th>
                    <th>ACAO</th>
                </tr>
              </thead>
              <tbody>
             {
                     items.map((item,index)=> (
                        <tr key={item.id_produto}>
                              <td>
                               <h6>{item.id_produto}</h6>
                                   </td>
                                   <td>
                                       <h6>{item.descricao}</h6>
                                   </td>
                                   <td>
                                      <h6>{item.preco}</h6>
                                   </td>
                                   <td>
                                      <Button color="info"  onClick={event => this.props.eventoEditarProduto({id_produto:item.id_produto,descricao:item.descricao,preco:item.preco,index})} size="sm"><FaEdit/></Button>{' '}
                                      <Button color="danger" onClick={event => this.props.eventoRemoveProduto(item.id_produto,index)} size="sm"><FaTrashAlt/></Button>{' '}
                                      <Button color="success" onClick={event => this.props.eventoAddCarrinho(event,({descricao:item.descricao,preco:item.preco,quantidade:0,precoTotal:item.preco}))} size="sm"><FaCartPlus/></Button>
                                   </td>
                                </tr>
                           ))
             }
              </tbody>
            </Table>
          );
    }
}


export class FormularioProduto extends Component{

    constructor(props){
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
    
    render(){
        return (
            <div className="teste p-4">
                <Row>
                    <Col>
                    <div className="titulo mb-3">
                         <h3 className="text-light">Cadastrar Produto</h3>
                    </div>
                    </Col>
                </Row>
              <Row className="mb-2">
               <Col>
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
        };
        
    }
