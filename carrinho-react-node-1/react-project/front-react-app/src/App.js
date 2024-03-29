import React, { Component } from "react";
import "./App.css";
import { Header } from "./componentes/Header";
import { Produto } from "./componentes/Produto";
import { Funcionario } from "./componentes/Funcionario";
import { Venda } from "./componentes/Venda";
import { Estoque } from "./componentes/Estoque";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      boolModalCarrinho: false,
      quantidadeCarrinho: 0,
      textoHeader: ""
    };
  }
  componentDidMount() {
    if (window.location.pathname.split("/")[1] === "funcionario") {
      this.setState({ textoHeader: "Funcionarios" });
    } else if (window.location.pathname.split("/")[1] === "") {
      this.setState({ textoHeader: "Produtos" });
    } else if (window.location.pathname.split("/")[1] === "estoque") {
      this.setState({ textoHeader: "Estoque" });
    } else {
      this.setState({ textoHeader: "Vendas" });
    }
  }

  mostrarModal = () => {
    this.setState({ boolModalCarrinho: !this.state.boolModalCarrinho });
  };

  eventoQuantidadeCarrinho = total => {
    this.setState({
      quantidadeCarrinho: total
    });
  };

  eventoTeste = teste => {
    this.eventoQuantidadeCarrinho(0);
    this.setState({ textoHeader: teste });
  };

  render() {
    return (
      <div className="App container-fluid">
        <Row>
          <Router>
            <Col md="2" className="cor-col-vh min-vh-100 m-0 p-0">
              <Col className="p-0 m-0">
                <ul>
                  <Link to="/">
                    <li>
                      <a
                        href="#"
                        onClick={event => this.eventoTeste("Produtos")}
                      >
                        Produtos
                      </a>
                    </li>
                  </Link>

                  <Link to="/funcionario">
                    <li>
                      <a onClick={event => this.eventoTeste("Funcionarios")}>
                        Funcionario
                      </a>
                    </li>
                  </Link>

                  <Link to="/estoque">
                    <li>
                      <a onClick={event => this.eventoTeste("Estoque")}>
                        Estoque
                      </a>
                    </li>
                  </Link>

                  <Link to="/venda">
                    <li>
                      <a onClick={event => this.eventoTeste("Vendas")}>Venda</a>
                    </li>
                  </Link>
                </ul>
              </Col>
            </Col>

            <Col md="10">
              <Row>
                <Col className="mb-3 p-0">
                  <Header
                    title={this.state.textoHeader}
                    mostrarModal={this.mostrarModal}
                    quantidadeCarrinho={this.state.quantidadeCarrinho}
                  />
                </Col>
              </Row>
              <Row className="mr-1 ml-1">
                <Col>
                  <Switch>
                    <Route path="/" exact={true}>
                      <Produto
                        estadoModalCarrinho={this.state.boolModalCarrinho}
                        eventoQuantidadeCarrinho={this.eventoQuantidadeCarrinho}
                        mostrarModal={this.mostrarModal}
                      />
                    </Route>
                    <Route exact path="/funcionario" component={Funcionario} />
                    <Route exact path="/venda" component={Venda} />
                    <Route exact path="/estoque" component={Estoque} />
                  </Switch>
                </Col>
              </Row>
            </Col>
          </Router>
        </Row>
      </div>
    );
  }
}

export default App;
