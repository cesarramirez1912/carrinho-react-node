import React, {Component} from 'react';
import{Header} from '../Header'
import{BarraEsquerda,MostrarFuncionarios,FormularioFuncionario} from './componentes-funcionario'
import { Row,Col} from 'react-bootstrap';


export class PaginaFuncionario extends Component{

    constructor(props){
        super(props);
        this.state = {
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
                     <FormularioFuncionario/>
                     <BarraEsquerda/>
                </Col>
                <Col md="9">
                    <Row>
                       <Col className="mb-3 p-0">
                            <Header title="Funcionario" mostrarModal={false} itensCarrinho={0}/>
                       </Col>
                  </Row>
                  <Row>
                      <MostrarFuncionarios/>
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
                      