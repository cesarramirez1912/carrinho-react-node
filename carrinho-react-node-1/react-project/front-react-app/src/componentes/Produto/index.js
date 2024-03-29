import React, { Component } from "react";
import "./style.css";
import { MostrarProdutos } from "./componentesProdutos";
import { ModalCarrinho, ModalNovoProduto } from "../Modal";
import { InputGroup, Input } from "reactstrap";
import { Col, Button, Row } from "react-bootstrap";
import * as rest from "../../Data/rest";

export class Produto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novoProduto: {},
      produtos: [],
      filtro: "",
      inputDefaultId: "",
      inputDefaultDescricao: "",
      inputDefaultPreco: "",
      inputDefaultQuantidade: "",
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
      inputDefaultPreco: dadosEditaveis.preco,
      inputDefaultQuantidade: dadosEditaveis.quantidade
    });
    this.eventoTrocaBotaoEdicaoCadastro();
    this.eventoModalNovoProduto();
  };

  eventoProdutoEditadoPronto = data => {
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
      this.setState({ inputDefaultQuantidade: event.target.value });
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
      inputDefaultQuantidade: ""
    });
  };

  eventoFiltrarInformacao = event => {
    event.preventDefault();
    this.setState({ filtro: event.target.value });
  };

  eventoTrocaBotaoEdicaoCadastro = () => {
    this.setState({
      botaoCadastrar: !this.state.botaoCadastrar
    });
  };

  render() {
    let filtroProdutos = this.state.produtos.filter(produtos => {
      return produtos.descricao
        .toLowerCase()
        .includes(this.state.filtro.toLowerCase());
    });
    return (
      <Col className="p-0">
        <div class="d-flex justify-content-between p-2">
          <div className="row p-0 m-0">
            <div>
              <a href="/" class="botao">
                Bebidas
              </a>
            </div>

            <div>
              <a href="/" class="botao">
                Bebidas
              </a>
            </div>
          </div>

          <div>
            <a class="botao" href="javascript:void(0);" onClick={event => this.eventoModalNovoProduto()}>
              Novo Produto
            </a>
          </div>
        </div>

        <Col className="coluna-mostrar-produto p-4 mt-3">
          <Row className="mt-0 mb-4 ml-1 mr-1 p-0">
            <InputGroup className="p-0">
              <Input
                onChange={event => this.eventoFiltrarInformacao(event)}
                name="filtro"
                placeholder="Busca por descricao produto"
              />
            </InputGroup>
          </Row>

          <MostrarProdutos
            eventoAddCarrinho={this.eventoAddCarrinho}
            eventoRemoveProduto={this.eventoRemoveProduto}
            eventoEditarProduto={this.eventoEditarProduto}
            controls={this.state.novoProduto}
            controle={this.state}
            filtroProdutos={filtroProdutos}
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
      </Col>
    );
  }
}
