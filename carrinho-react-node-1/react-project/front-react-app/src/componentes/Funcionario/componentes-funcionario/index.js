
import React,{Component} from 'react';
import { Link } from 'react-router-dom'
import { FaCartPlus,FaEdit,FaTrashAlt } from "react-icons/fa";
import { Button,Table,InputGroup,Input,Col,Row} from 'reactstrap';

export class BarraEsquerda extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        return (
             <Col>
                <Link to="/">
                    <Row>
                        <button type='button' className='btn2 w-100'>
                                <h4>Produtos</h4>
                        </button>
                        </Row>
                </Link> 
                    <Row>
                        <button type='button' className='btn2 w-100'>
                            <h4>Estoque</h4>
                        </button>
                    </Row>
                    <Row>
                        <button type='button' className='btn2 w-100'>
                            <h4>Vendas</h4>
                        </button>
                    </Row>
             </Col>
          );
    }
}

export class MostrarFuncionarios extends Component {
    render(){
        let items = [{
            "id_produto": 59,
            "descricao": "Pack do Brasil Intensos - 50 Cáps",
            "preco": 122.2,
            "salario": 2.200
        },
        {
            "id_produto": 58,
            "descricao": "Café Pilão Tradicional Vácuo 500 g",
            "preco": 10.9,
            "salario": 2.200
        },
        {
            "id_produto": 57,
            "descricao": "Feijão Preto Tipo 1 Broto Legal 1 Kg",
            "preco": 6.89,
            "salario": 2.200
        },
        {
            "id_produto": 56,
            "descricao": "Sabão Líquido OMO Multiação 1L ",
            "preco": 11.33,
            "salario": 2.200
        }];
        return(
            <Col>
             <Table striped className="estilo-tabela">
              <thead className="bg-dark text-white">
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>CARGO</th>
                    <th>SALARIO</th>
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
                                   <h6>{item.salario}</h6>
                                   </td>
                                   <td>
                                        <Button color="info" onClick={event => this.props.eventoEditarProduto({id_produto:item.id_produto,descricao:item.descricao,preco:item.preco,index})} size="sm"><FaEdit/></Button>{' '}
                                        <Button color="danger" onClick={event => this.props.eventoRemoveProduto(item.id_produto,index)} size="sm"><FaTrashAlt/></Button>
                                   </td>
                                </tr>
                           ))
             }
              </tbody>
            </Table>
            </Col>
        );
    }
}

export class FormularioFuncionario extends Component {

    constructor(props){
        super(props)
        this.state = {
            dalorDefault:'',
            botaoCadastrar:true,
        }
    }

    funcaoTeste = () => {
        this.setState({
            botaoCadastrar:!this.state.botaoCadastrar
        })
    } 

    render(){
        return(
            <div className="teste">
            <Row className="p-4">
                 <Col>
                         <div className="titulo mb-3">
                             <h3 className="text-light">Cadastrar Funcionario</h3>
                          </div>
                          <h5 className="text-light mb-2">Nome</h5>
                              <form id="id-form">
                                     <InputGroup className="mb-2">
                                         <Input name="nome"  defaultValue={this.state.valorDefault} onChange={(event) =>this.trocarInputDescricao(event)} placeholder="Ex: Leite" />
                                     </InputGroup>
                                     <h5 className="text-light mb-2">Cargo</h5>
                                     <InputGroup className="mb-2">
                                         <Input name="cargo" defaultValue={this.state.valorDefault} onChange={(event) => this.trocarInputPreco(event)} placeholder="R$" />
                                     </InputGroup>
                                     <h5 className="text-light">Salario</h5>
                                     <InputGroup className="mb-2">
                                         <Input name="salario" defaultValue={this.state.valorDefault} onChange={(event)=> this.trocarQuantidade(event)} placeholder="1,2,3.." />
                                     </InputGroup>
                                     {this.state.botaoCadastrar ? <Button className="w-100 mt-3 bg-success" onClick={(event)=> this.funcaoTeste(event)}>Cadastrar</Button> : <Button className="w-100 mt-3 bg-info" onClick={(event)=> this.funcaoTeste(event)}>Atualizar</Button>}
                              </form>
                     </Col>
            </Row>
             </div>
        );
    }
}