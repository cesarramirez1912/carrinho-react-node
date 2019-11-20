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
      indexEditado: "",
      inputDefaultId:"",
      inputDefaultNome:"",
      inputDefaultCargo:"",
      inputDefaultSalario:"",
      estadoBotaoCadastrarEditar:true,
    };
  }

  componentDidMount() {
    rest.mostrarTodos("funcionarios").then(funcionarios => {
      this.setState({ funcionarios });
    });
  }

  eventoEditarFuncionario = dadosEditaveis => {
    this.setState({
      indexEditado: dadosEditaveis.index,
      inputDefaultId: dadosEditaveis.id_vendedor,
      inputDefaultNome:dadosEditaveis.nome,
      inputDefaultCargo:dadosEditaveis.cargo,
      inputDefaultSalario:dadosEditaveis.salario,
    });
    this.eventoTrocaBotaoEdicaoCadastro();
    this.eventoModalNovoFuncionario();
  };

  eventoProdutoEditadoPronto = data => {
    var arrayTemporario = this.state.funcionarios;
    arrayTemporario[this.state.indexEditado] = data;
    this.setState({
      funcionarios: arrayTemporario
    });
    this.eventoZerarInput();
    this.eventoTrocaBotaoEdicaoCadastro();
    this.eventoModalNovoFuncionario();
  };


  eventoModalNovoFuncionario = ()=>{
    this.setState({modalCriarFuncionario:!this.state.modalCriarFuncionario})
  }

  eventoTrocaBotaoEdicaoCadastro=()=>
  {
    this.setState({estadoBotaoCadastrarEditar:!this.state.estadoBotaoCadastrarEditar})
  }

  eventoRemoveFuncionario= (id, index) => {
    rest.removerPorId(id, "deletarfuncionario").then(respostaExcluido => {
      console.log(respostaExcluido)
      if (respostaExcluido.status === 200) {
        this.setState({
          funcionarios: this.state.funcionarios.filter((e, i) => {
            return i !== index;
          })
        });
      } else {
        console.log("erro ao deletar");
      }
    });
  };

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
        <MostrarFuncionarios eventoRemoveFuncionario={this.eventoRemoveFuncionario} funcionarios={this.state.funcionarios}  eventoZerarInput={this.eventoZerarInput} eventoEditarFuncionario={this.eventoEditarFuncionario} />
        <ModalNovoFuncionario eventoProdutoEditadoPronto={this.eventoProdutoEditadoPronto} eventoTrocaBotaoEdicaoCadastro={this.eventoTrocaBotaoEdicaoCadastro} variaveis={this.state} eventoTrocarInput={this.eventoTrocarInput} eventoZerarInput={this.eventoZerarInput} estadoModalNovoFuncionario={this.state.modalCriarFuncionario} eventoModalNovoFuncionario={this.eventoModalNovoFuncionario} eventoAtualizarListaFuncionarios={this.eventoAtualizarListaFuncionarios}/>
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
