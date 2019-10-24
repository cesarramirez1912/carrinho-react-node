import React, {Component} from 'react';
import{Header} from '../Header'
import{FormularioProduto} from '../Produto'
import { Row,Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'

export class PaginaFuncionario extends Component{

    constructor(props){
        super(props);
        this.state = {
            itensCarrinho:[],
            modal: false
        }
    }

    mostrarModal = () => {
        this.setState({modal:!this.state.modal})
      }
   
    render(){
        return (
            <div className="App container-fluid">
              <Row>
                 <Col md="3" className="cor-col-vh min-vh-100 m-0 p-0">
                 <Col>
                 <Link to="/">
                            <Row>
                                <button type='button' className='btn2 w-100'>
                                        <h4>Produtos</h4>
                                </button>
                             </Row>
                        </Link> 
                        <Link to="/funcionario">
                            <Row>
                                <button type='button' className='btn2 w-100'>
                                        <h4>Funcionario</h4>
                                </button>
                             </Row>
                        </Link> 
                        <Row>
                            <button type='button' className='btn2 w-100' onClick={(event)=> this.testeBotao()}>
                                <h4>Estoque</h4>
                            </button>
                        </Row>
                        <Row>
                            <button type='button' className='btn2 w-100' onClick={(event)=> this.testeBotao()}>
                                <h4>Vendas</h4>
                            </button>
                        </Row>
                    </Col>
                </Col>
                <Col md="9">
                    <Row>
                       <Col className="mb-3 p-0">
                       <Header title="Funcionario" mostrarModal={this.mostrarModal} itensCarrinho={this.state.itensCarrinho}/>
                       </Col>
                  </Row>
                  <Row>
               
                  </Row>
                </Col>
              </Row>
            </div>
            );
        };
    }

// <FormularioProduto eventoAddProduto={this.eventoAddProduto} produtoEditadoPronto={this.produtoEditadoPronto} controle={this.state} eventoSetState={this.eventoSetState.bind(this)} eventoBotaoEditar={this.eventoBotaoFormularioEdicao} eventosTrocarDescricao={this.trocarInputDescricao.bind(this)}  eventosTrocarPreco={this.trocarInputPreco.bind(this)}/>
  //   <ModalCarrinho controle={this.state}  mostrarModal={this.mostrarModal}/>
  // <Header title="Produtos" mostrarModal={this.mostrarModal} itensCarrinho={this.state.itensCarrinho}/>
                      