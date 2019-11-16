import React, { Component } from "react";
import "./App.css";
import { Header } from "./componentes/Header";
import { Produto } from "./componentes/Produto";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      boolModalCarrinho: false,
      quantidadeCarrinho: 0
    };
  }

  mostrarModal = () => {
    this.setState({ boolModalCarrinho: !this.state.boolModalCarrinho });
  };

  eventoQuantidadeCarrinho = total => {
    this.setState({
      quantidadeCarrinho: total
    });
  };

  render() {
    return (
      <div className="App container-fluid">
        <Row>
          <Col md="3" className="cor-col-vh min-vh-100 m-0 p-0">
            <Col>
              <Link to="/funcionario">
                <Row>
                  <Button
                    type="button"
                    className="btn2 w-100"
                    onClick={event => this.testeBotao()}
                  >
                    <h4>Funcionario</h4>
                  </Button>
                </Row>
              </Link>
              <Row>
                <Button
                  type="button"
                  className="btn2 w-100"
                  onClick={event => this.testeBotao()}
                >
                  <h4>Estoque</h4>
                </Button>
              </Row>
              <Row>
                <Button
                  type="button"
                  className="btn2 w-100"
                  onClick={event => this.testeBotao()}
                >
                  <h4>Vendas</h4>
                </Button>
              </Row>
            </Col>
          </Col>
          <Col md="9">
            <Row>
              <Col className="mb-2 p-0">
                <Header
                  title="Produtos"
                  mostrarModal={this.mostrarModal}
                  quantidadeCarrinho={this.state.quantidadeCarrinho}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Produto
                  estadoModalCarrinho={this.state.boolModalCarrinho}
                  eventoQuantidadeCarrinho={this.eventoQuantidadeCarrinho}
                  mostrarModal={this.mostrarModal}
                ></Produto>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
