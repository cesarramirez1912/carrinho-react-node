import React, { Component } from "react";
import "./App.css";
import { Header } from "./componentes/Header";
import { Produto } from "./componentes/Produto";
import { Funcionario } from "./componentes/Funcionario";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      boolModalCarrinho: false,
      quantidadeCarrinho: 0,
      textoHeader:"Produtos"
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

 eventoTeste = (teste) => {
    this.setState({textoHeader:teste})
  }

  render() {
    console.log('testetestsrte')
    return (
      <div className="App container-fluid">
        <Row>
          <Router>
            <Col md="3" className="cor-col-vh min-vh-100 m-0 p-0">
              <Col>
                <Row>
                  <Link to="/">
                    <li onClick={event =>this.eventoTeste('Produtos')}>
                      <Link to="/">Produtos</Link>
                    </li>
                  </Link>
                </Row>
                <Row>
                  <Link to="/funcionario">
                    <li onClick={event =>this.eventoTeste('Funcionario')}>
                      <Link to="/funcionario">Funcionario</Link>
                    </li>
                  </Link>
                </Row>
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
                    title={this.state.textoHeader}
                    mostrarModal={this.mostrarModal}
                    quantidadeCarrinho={this.state.quantidadeCarrinho}
                  />
                </Col>
              </Row>
              <Row>
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
//  <Route path="/funcionario" component={PaginaFuncionario} />
/*  <Produto
                  estadoModalCarrinho={this.state.boolModalCarrinho}
                  eventoQuantidadeCarrinho={this.eventoQuantidadeCarrinho}
                  mostrarModal={this.mostrarModal}
                ></Produto>*/
/* <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App}/>
            <Route path="/funcionario"  component={PaginaFuncionario}/>
        </Switch>
    </BrowserRouter>*/

//import {BrowserRouter,Switch,Route} from 'react-router-dom'
