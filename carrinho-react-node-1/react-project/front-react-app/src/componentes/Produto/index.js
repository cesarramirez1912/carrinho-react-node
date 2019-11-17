import React, { Component } from "react";
import "./style.css";
import { MostrarProdutos } from "./componentesProdutos";
import { ModalCarrinho, ModalNovoProduto } from "../Modal";
import {InputGroup,Input,} from "reactstrap";
import { Col, Button, Row} from "react-bootstrap";
import * as rest from "../../Data/rest";

export class Produto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novoProduto: {},
      produtos: [],
      inputDefaultDescricao: "",
      inputDefaultPreco: "",
      inputDefaultId: "",
      indexEditado: "",
      booleano: false,
      itensCarrinho: [],
      botaoCadastrar: true,
      boolModalNovoProduto: false
    };
  }

  componentDidMount() {
    rest.mostrarTodos("produtos").then(produtos => {
      this.setState({ produtos });
    });
  }

  eventoModalNovoProduto = () => {
    this.setState({
      boolModalNovoProduto: !this.state.boolModalNovoProduto
    });
  };

  eventoAddCarrinho = (e, items) => {
    var arrayTemporario = this.state.itensCarrinho;
    var valorTemporario = items.quantidade;
    arrayTemporario.push(items);
    arrayTemporario.forEach((item, index) => {
      console.log(item)
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

  eventoEditarProduto = dadosEditaveis => {
    this.setState({
      indexEditado: dadosEditaveis.index,
      inputDefaultId: dadosEditaveis.id_produto,
      inputDefaultDescricao: dadosEditaveis.descricao,
      inputDefaultPreco: dadosEditaveis.preco
    });
    this.eventoTrocaBotaoEdicaoCadastro();
    this.eventoModalNovoProduto();
  };

  eventoProdutoEditadoPronto = data => {
    console.log("produtoeditado");
    var arrayTemporario = this.state.produtos;
    arrayTemporario[this.state.indexEditado] = data;
    this.setState({
      produtos: arrayTemporario
    });
    this.eventoZerarInput();
    this.eventoTrocaBotaoEdicaoCadastro();
    this.eventoModalNovoProduto();
  };

  eventoRemoveProduto = (id, index) => {
    rest.removerPorId(id, "deletar").then(respostaExcluido => {
      if (respostaExcluido.status === 200) {
        this.setState({
          produtos: this.state.produtos.filter((e, i) => {
            return i !== index;
          })
        });
      } else {
        console.log("erro ao deletar");
      }
    });
  };

  eventoTrocarInput = event => {
    if (event.target.name === "desc") {
      this.setState({ inputDefaultDescricao: event.target.value });
    } else if (event.target.name === "rs") {
      this.setState({ inputDefaultPreco: event.target.value });
    } else {
      console.log("qntd");
    }
  };

  eventoBotaoFormulario = dadosFormulario => {
    this.setState({ novoProduto: dadosFormulario });
  };

  eventoAtualizarListaProdutos = produtos => {
    this.setState({ produtos });
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
        <Row className="mb-2">
        <Col className="float-left p-0">
        <Button onClick={event => this.eventoModalNovoProduto()}>
            <h2 className="text-light m-0 p-0"> </h2>Novo Produto +
          </Button>
        </Col>
          <Col className="col-9 p-0 float-right">
          <InputGroup className="mb-2">
            <Input name="desc" placeholder="Ex: Leite" />
          </InputGroup>
          </Col>
        </Row>

        <MostrarProdutos
          eventoAddCarrinho={this.eventoAddCarrinho}
          eventoRemoveProduto={this.eventoRemoveProduto}
          eventoEditarProduto={this.eventoEditarProduto}
          controls={this.state.novoProduto}
          controle={this.state}
        />
        <ModalCarrinho
          controle={this.props.estadoModalCarrinho}
          totalCarrinho={this.totalCarrinho}
          mostrarModal={this.props.mostrarModal}
          itensCarrinho={this.state.itensCarrinho}
          estadoBotaoCadastrarEditar={this.state.botaoCadastrar}
        />
        <ModalNovoProduto
          eventoTrocaBotaoEdicaoCadastro={this.eventoTrocaBotaoEdicaoCadastro}
          eventoProdutoEditadoPronto={this.eventoProdutoEditadoPronto}
          controle={this.state}
          estadoModal={this.state.boolModalNovoProduto}
          estadoBotaoCadastrarEditar={this.state.botaoCadastrar}
          eventoAtualizarListaProdutos={this.eventoAtualizarListaProdutos}
          eventoZerarInput={this.eventoZerarInput}
          eventoTrocarInput={this.eventoTrocarInput}
          eventoModalNovoProduto={this.eventoModalNovoProduto}
        />
      </Col>
    );
  }
}

/*<Col>
<InputGroup className="mb-2">
  <Input name="desc" placeholder="Ex: Leite" />
</InputGroup>
</Col>*/
