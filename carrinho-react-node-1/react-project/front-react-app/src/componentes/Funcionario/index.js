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


    import React, { Component } from "react";
import "./style.css";
import { MostrarFuncionarios } from "../Funcionario/componentes-Funcionario/ComponentesFuncionario";
import { ModalCarrinho, ModalNovoFuncionario } from "../Modal";
import { Col, Button, Row } from "react-bootstrap";

export class Funcionario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novoFuncionario: {},
      funcionarios: [],
      funcionarioEditado: {
        id_funcionario: "",
        nome: "",
        cargo: "",
        salario: ""
      },
      inputDefaultNome: "",
      inputDefaultSalario: "",
      inputDefaultCargo: "",
      indexEditado: "",
      botaoCadastrar: true,
      boolModalNovoFuncionario: false
    };
  }

  
  eventoModalNovoFuncionario= () => {
    this.setState({
      boolModalNovoFuncionario: !this.state.boolModalNovoFuncionario
    });
  };

  eventoAddCarrinho = (e, items) => {
    var arrayTemporario = this.state.itensCarrinho;
    var valorTemporario = items.quantidade;
    arrayTemporario.push(items);
    arrayTemporario.forEach((item, index) => {
      if (item.descricao !== items.descricao) {
      } else {
        valorTemporario = arrayTemporario[index].quantidade;
        arrayTemporario[index].quantidade = valorTemporario + 1;
        item.precoTotal = item.quantidade * item.preco;
        item.precoTotal = item.precoTotal.toFixed(2);
        if (valorTemporario !== 0) {
          arrayTemporario.pop();
        }
      }
    });
    this.totalCarrinho(arrayTemporario.length);
    this.setState({ itensCarrinho: arrayTemporario });
  };

  totalCarrinho = tamanho => {
    this.props.eventoQuantidadeCarrinho(tamanho);
  };

  eventoEditarFuncionario = dadosEditaveis => {
    this.setState({
      indexEditado: dadosEditaveis.index,
      inputDefaultId: dadosEditaveis.id_Funcionario,
      inputDefaultDescricao: dadosEditaveis.descricao,
      inputDefaultPreco: dadosEditaveis.preco
    });
    this.eventoTrocaBotaoEdicaoCadastro();
    this.eventoModalNovoFuncionario();
  };

  eventoFuncionarioEditadoPronto = data => {
    console.log("Funcionarioeditado");
    var arrayTemporario = this.state.Funcionarios;
    arrayTemporario[this.state.indexEditado] = data;
    this.setState({
      Funcionarios: arrayTemporario
    });
    this.eventoZerarInput();
    this.eventoTrocaBotaoEdicaoCadastro();
    this.eventoModalNovoFuncionario();
  };

  eventoRemoveFuncionario = (id, index) => {
    fetch("http://localhost:8081/deletar", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_Funcionario: id
      })
    }).then(res =>
      res.json().then(json => {
        this.setState({
          Funcionarios: this.state.Funcionarios.filter((e, i) => {
            return i !== index;
          })
        });
      })
    );
  };

  eventoTrocarInput = event => {
    console.log(event.target.value);
    if (event.target.name === "desc") {
      this.setState({ inputDefaultDescricao: event.target.value });
    } else if (event.target.name === "rs") {
      this.setState({ inputDefaultPreco: event.target.value });
    } else {
      console.log("qntd");
    }
  };

  eventoBotaoFormulario = dadosFormulario => {
    this.setState({ novoFuncionario: dadosFormulario });
  };

  eventoAtualizarListaFuncionarios = Funcionarios => {
    this.setState({ Funcionarios });
  };

  eventoZerarInput = () => {
    this.setState({
      inputDefaultDescricao: "",
      inputDefaultPreco: "",
      inputDefaultId: ""
    });
  };

  eventoTrocaBotaoEdicaoCadastro = () => {
    this.setState({
      botaoCadastrar: !this.state.botaoCadastrar
    });
  };

  render() {
    return (
      <Col>
        <Row className="mb-2 ml-1">
          <Button onClick={event => this.eventoModalNovoFuncionario()}>
            <h2 className="text-light m-0 p-0"> </h2>Novo Funcionario +
          </Button>
        </Row>
        <MostrarFuncionarios
          eventoAddCarrinho={this.eventoAddCarrinho}
          eventoRemoveFuncionario={this.eventoRemoveFuncionario}
          eventoEditarFuncionario={this.eventoEditarFuncionario}
          controls={this.state.novoFuncionario}
          controle={this.state}
        />
        <ModalCarrinho
          controle={this.props.estadoModalCarrinho}
          totalCarrinho={this.totalCarrinho}
          mostrarModal={this.props.mostrarModal}
          itensCarrinho={this.state.itensCarrinho}
          estadoBotaoCadastrarEditar={this.state.botaoCadastrar}
        />
        <ModalNovoFuncionario
          eventoTrocaBotaoEdicaoCadastro={this.eventoTrocaBotaoEdicaoCadastro}
          eventoFuncionarioEditadoPronto={this.eventoFuncionarioEditadoPronto}
          controle={this.state}
          estadoModal={this.state.boolModalNovoFuncionario}
          estadoBotaoCadastrarEditar={this.state.botaoCadastrar}
          eventoAtualizarListaFuncionarios={this.eventoAtualizarListaFuncionarios}
          eventoZerarInput={this.eventoZerarInput}
          eventoTrocarInput={this.eventoTrocarInput}
          eventoModalNovoFuncionario={this.eventoModalNovoFuncionario}
        />
      </Col>
    );
  }
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