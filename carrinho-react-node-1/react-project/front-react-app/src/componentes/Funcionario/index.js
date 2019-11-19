import React, { Component } from "react";
import * as rest from "../../Data/rest";
import { Button, Row,Col } from "reactstrap";
import {MostrarFuncionarios} from "./componentesFuncionarios";
import {ModalNovoFuncionario} from "../Modal";

export class Funcionario extends Component {
  constructor() {
    super();
    this.state = {
      funcionarios: [],
      modalCriarFuncionario:false,
      inputDefaultNome:"",
      inputDefaultCargo:"",
      inputDefaultSalario:"",
      estadoBotaoCadastrarEditar:true
    };
  }

  componentDidMount() {
    rest.mostrarTodos("funcionarios").then(funcionarios => {
      this.setState({ funcionarios });
    });
  }

  eventoModalNovoFuncionario = ()=>{
    this.setState({modalCriarFuncionario:!this.state.modalCriarFuncionario})
    this.eventoZerarInput();
  }

  eventoTrocaBotaoEdicaoCadastro=()=>
  {
    this.setState({estadoBotaoCadastrarEditar:!this.state.modalCriarFuncionario})
  }

  eventoTrocarInput = event => {
    if (event.target.name === "nome") {
      console.log(event.target.value)
      this.setState({ inputDefaultNome: event.target.value });
    } else if (event.target.name === "cargo") {
      console.log(event.target.value)
      this.setState({ inputDefaultCargo: event.target.value });
    } else {
      console.log(event.target.value)
      this.setState({ inputDefaultSalario: event.target.value });
    }
  };

  eventoAtualizarListaFuncionarios = funcionarios => {
    this.setState({ funcionarios });
  };

  eventoZerarInput = () => {
    this.setState({
      inputDefaultNome:"",
      inputDefaultCargo:"",
      inputDefaultSalario:""
    });
  };
  

  render() {
    return (
      <Col>
        <Row className="mb-2">
          <Col className="float-left p-0">
            <Button className="bg-primary" onClick={event => this.eventoModalNovoFuncionario()}>
              <h2 className="text-light m-0 p-0"> </h2>Novo Funcionario +
            </Button>
          </Col>
        </Row>
        <MostrarFuncionarios funcionarios={this.state.funcionarios}/>
        <ModalNovoFuncionario eventoTrocaBotaoEdicaoCadastro={this.eventoTrocaBotaoEdicaoCadastro} variaveis={this.state} eventoTrocarInput={this.eventoTrocarInput} eventoZerarInput={this.eventoZerarInput} estadoModalNovoFuncionario={this.state.modalCriarFuncionario} eventoModalNovoFuncionario={this.eventoModalNovoFuncionario} eventoAtualizarListaFuncionarios={this.eventoAtualizarListaFuncionarios}/>
      </Col>
    );
  }
}

/*

 onClick={event =>
                  this.props.eventoRemoveProduto(item.id_produto, index)
                }

                 onClick={event =>
                  this.props.eventoAddCarrinho(event, {
                    descricao: item.descricao,
                    preco: item.preco,
                    quantidade: 0,
                    precoTotal: item.preco
                  })
                }

onClick={event =>
                  this.props.eventoEditarProduto({
                    id_produto: item.id_produto,
                    descricao: item.descricao,
                    preco: item.preco,
                    index
                  })
                }*/
