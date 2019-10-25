import React, {Component} from 'react';
import{Header} from '../Header'
import{BarraEsquerda,MostrarFuncionarios,FormularioFuncionario} from './componentes-funcionario'
import { Row,Col} from 'react-bootstrap';


export class PaginaFuncionario extends Component{

    constructor(props){
        super(props);
        this.state = {
            botaoCadastrar:false,
            funcionarios:[],
        }
    }

    componentDidMount(){
        fetch('http://localhost:8081/funcionarios')
        .then(response => response.json())
        .then(funcionarios=>{
            this.setState({funcionarios:funcionarios})
        })
        .catch(e=> console.log(e));
    }

    eventoEditar = () => {
        this.setState({
            botaoCadastrar:!this.state.botaoCadastrar
        })
    } 



   /* mostrarModal = () => {
        this.setState({modal:!this.state.modal})
      }*/
   
    render(){
        return (
            <div className="App container-fluid">
              <Row>
                 <Col md="3" className="cor-col-vh min-vh-100 m-0 p-0">
                     <FormularioFuncionario estadoBotao={this.state.botaoCadastrar} eventoEditar={this.eventoEditar}/>
                     <BarraEsquerda/>
                </Col>
                <Col md="9">
                    <Row>
                       <Col className="mb-3 p-0">
                            <Header title="Funcionario" mostrarModal={false} itensCarrinho={0}/>
                       </Col>
                  </Row>
                  <Row>
                      <MostrarFuncionarios todosOsFuncionarios={this.state.funcionarios}/>
                  </Row>
                </Col>
              </Row>
            </div>
            );
        };
    }