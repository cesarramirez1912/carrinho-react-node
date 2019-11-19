import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  InputGroup,
  Input,
  Col,
  Row
} from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import * as rest from "../../Data/rest";

export class ModalCarrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: []
    };
  }

  componentDidMount() {
    this.setState({ produtos: this.props.itensCarrinho });
  }

  quantidade = (e, index, numero, op) => {
    let newState = Object.assign(this.state);
    if (op === "+") {
      newState.produtos[index].quantidade = numero + 1;
      newState.produtos[index].precoTotal = (
        newState.produtos[index].quantidade * newState.produtos[index].preco
      ).toFixed(2);
      this.setState(newState);
    } else {
      newState.produtos[index].quantidade = numero - 1;
      newState.produtos[index].precoTotal = (
        newState.produtos[index].quantidade * newState.produtos[index].preco
      ).toFixed(2);
      this.setState(newState);
    }
  };

  removerProdutoCarrinho = (e, index) => {
    let newState = Object.assign(this.state);
    newState.produtos.splice(index, 1);
    this.props.totalCarrinho(this.state.produtos.length);
    this.setState(newState);
  };

  render() {
    var itens = this.state.produtos;
    let precoTotalVar = 0;
    itens.forEach(elemento => {
      precoTotalVar = +precoTotalVar + +elemento.precoTotal;
    });
    return (
      <div>
        <Modal isOpen={this.props.controle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>
            Deseja finalizar a compra?
          </ModalHeader>
          <ModalBody>
            <Table striped>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Unitario</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <h6>{itens[index].descricao}</h6>
                    </td>
                    <td>
                      <h6>{itens[index].preco}</h6>
                    </td>
                    <td>
                      <Button
                        color="muted"
                        onClick={event =>
                          this.quantidade(
                            event,
                            index,
                            itens[index].quantidade,
                            "+"
                          )
                        }
                        size="sm"
                      >
                        +
                      </Button>
                      {itens[index].quantidade}
                      <Button
                        color="muted"
                        onClick={event =>
                          this.quantidade(
                            event,
                            index,
                            itens[index].quantidade,
                            ""
                          )
                        }
                        size="sm"
                      >
                        -
                      </Button>
                    </td>
                    <td>
                      <h6>{itens[index].precoTotal}</h6>
                    </td>
                    <td>
                      <Button
                        color="danger"
                        onClick={event =>
                          this.removerProdutoCarrinho(event, index)
                        }
                        size="sm"
                      >
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <h4>Total:</h4>
                  </td>
                  <td>
                    <h4>R$ {precoTotalVar.toFixed(2)}</h4>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={``}>
              Finalizar Compra
            </Button>{" "}
            <Button
              color="secondary"
              onClick={event => this.props.mostrarModal()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export class ModalNovoProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: {}
    };
  }

  trocarInput(event) {
    this.props.eventoTrocarInput(event);
  }

  eventoAddProduto = e => {
    e.preventDefault();
    var objetoProduto = {
      descricao: this.props.controle.inputDefaultDescricao,
      preco: this.props.controle.inputDefaultPreco
    };
    rest.inserirNovo(objetoProduto, "novoproduto").then(respostaInserir => {
      if (respostaInserir.status === 200) {
        respostaInserir.json().then(json => {
          var produto = {
            id_produto: json.insertId,
            descricao: this.props.controle.inputDefaultDescricao,
            preco: this.props.controle.inputDefaultPreco
          };
          var arrayTemporario = this.props.controle.produtos;
          arrayTemporario.unshift(produto);
          this.props.eventoAtualizarListaProdutos(arrayTemporario);
          this.props.eventoZerarInput();
          this.cancelCourse();
          this.props.eventoModalNovoProduto();
        });
      } else {
        console.log("erro-inserir");
      }
    });
  };

  clickEdit = () => {
    var objetoEditarProduto = {
      id_produto: this.props.controle.inputDefaultId,
      descricao: this.props.controle.inputDefaultDescricao,
      preco: this.props.controle.inputDefaultPreco
    };
    rest.editarObjeto(objetoEditarProduto, "update").then(respostaEditar => {
      if (respostaEditar.status === 200) {
        this.props.eventoProdutoEditadoPronto(objetoEditarProduto);
        this.cancelCourse();
        this.props.eventoZerarInput();
      } else {
        console.log("erro-editar");
      }
    });
  };

  cancelCourse = () => {
    document.getElementById("id-form").reset();
  };

  cancelarModal = () => {
    this.cancelCourse();
    this.props.eventoZerarInput();
    if (this.props.estadoBotaoCadastrarEditar !== true) {
      this.props.eventoTrocaBotaoEdicaoCadastro();
    }
    this.props.eventoModalNovoProduto();
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.estadoModal} className="modal-md">
          <ModalHeader toggle={this.toggle}>
            Cadastrar/Editar Produto
          </ModalHeader>
          <ModalBody>
            <div className="teste">
              <Row className="p-4">
                <Col>
                  <div className="titulo mb-3">
                    <h3 className="text-dark">Cadastrar Produto</h3>
                  </div>
                  <h5 className="text-dark mb-2">Descricao</h5>
                  <form id="id-form">
                    <InputGroup className="mb-2">
                      <Input
                        name="desc"
                        defaultValue={this.props.controle.inputDefaultDescricao}
                        onChange={event => this.trocarInput(event)}
                        placeholder="Ex: Leite"
                      />
                    </InputGroup>
                    <h5 className="text-dark mb-2">Preco</h5>
                    <InputGroup className="mb-2">
                      <Input
                        name="rs"
                        defaultValue={this.props.controle.inputDefaultPreco}
                        onChange={event => this.trocarInput(event)}
                        placeholder="R$"
                      />
                    </InputGroup>
                    <h5 className="text-dark">Quantidade</h5>
                    <InputGroup className="mb-2">
                      <Input
                        name="qntd"
                        defaultValue={this.props.controle.inputDefaultId}
                        onChange={event => this.trocarInput(event)}
                        placeholder="1,2,3.."
                      />
                    </InputGroup>
                    {this.props.estadoBotaoCadastrarEditar ? (
                      <Button
                        className="w-100 mt-3 bg-success"
                        onClick={event => this.eventoAddProduto(event)}
                      >
                        Cadastrar
                      </Button>
                    ) : (
                      <Button
                        className="w-100 mt-3 bg-info"
                        onClick={this.clickEdit}
                      >
                        Atualizar
                      </Button>
                    )}
                  </form>
                </Col>
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.cancelarModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export class ModalNovoFuncionario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      funcionarios: []
    };
  }

  eventoAddFuncionario = e => {
    e.preventDefault();
    var objetoFuncionario = {
      nome: this.props.variaveis.inputDefaultNome,
      cargo: this.props.variaveis.inputDefaultCargo,
      salario: this.props.variaveis.inputDefaultSalario
    };
    console.log(objetoFuncionario)
    rest.inserirNovo(objetoFuncionario, "novofuncionario").then(respostaInserir => {
      if (respostaInserir.status === 200) {
        respostaInserir.json().then(json => {
          var objetoFuncionario = {
            id_vendedor: json.insertId,
            nome: this.props.variaveis.inputDefaultNome,
            cargo: this.props.variaveis.inputDefaultCargo,
            salario: this.props.variaveis.inputDefaultSalario
          };
          var arrayTemporario = this.props.variaveis.funcionarios;
          arrayTemporario.unshift(objetoFuncionario);
          this.props.eventoAtualizarListaFuncionarios(arrayTemporario);
          this.props.eventoZerarInput();
          this.cancelCourse();
          this.props.eventoModalNovoFuncionario();
        });
      } else {
        console.log("erro-inserir");
      }
    });
  };

  cancelCourse = () => {
    document.getElementById("id-form").reset();
  };

  
  cancelarModal = () => {
    this.cancelCourse();
    this.props.eventoZerarInput();
    if (this.props.estadoBotaoCadastrarEditar !== true) {
      this.props.eventoTrocaBotaoEdicaoCadastro();
    }
    this.props.eventoModalNovoProduto();
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.estadoModalNovoFuncionario}
          className="modal-md"
        >
          <ModalHeader toggle={this.toggle}>Cadastrar Funcionario</ModalHeader>
          <ModalBody>
            <Row className="p-4">
              <Col>
                <h5 className="text-dark mb-2">Nome</h5>
                <form id="id-form">
                  <InputGroup className="mb-2">
                    <Input
                      name="nome"
                      defaultValue={this.props.variaveis.inputDefaultNome}
                      onChange={event => this.props.eventoTrocarInput(event)}
                      placeholder="Ex: Ruben"
                    />
                  </InputGroup>
                  <h5 className="text-dark mb-2">Cargo</h5>
                  <InputGroup className="mb-2">
                    <Input
                      name="cargo"
                      defaultValue={this.props.variaveis.inputDefaultCargo}
                      onChange={event => this.props.eventoTrocarInput(event)}
                      placeholder="Ex: Gerente"
                    />
                  </InputGroup>
                  <h5 className="text-dark">Salario</h5>
                  <InputGroup className="mb-2">
                    <Input
                      name="rs"
                      defaultValue={this.props.variaveis.inputDefaultSalario}
                      onChange={event => this.props.eventoTrocarInput(event)}
                      placeholder="R$"
                    />
                  </InputGroup>
                  {this.props.variaveis.estadoBotaoCadastrarEditar ? (
                    <Button onClick={event =>this.eventoAddFuncionario(event)} className="w-100 mt-3 bg-success">Cadastrar</Button>
                  ) : (
                    <Button className="w-100 mt-3 bg-info">Atualizar</Button>
                  )}
                </form>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" >
              Criar
            </Button>{" "}
            <Button
              color="secondary"
              onClick={event => this.props.eventoModalNovoFuncionario()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

/*   defaultValue={this.props.controle.inputDefaultDescricao}
                        onChange={event => this.trocarInput(event)}

                           onClick={event => this.eventoAddProduto(event)}
                         onClick={this.clickEdit}
   defaultValue={this.props.controle.inputDefaultId}
                        onChange={event => this.trocarInput(event)}

                        defaultValue={this.props.controle.inputDefaultPreco}
                        onChange={event => this.trocarInput(event)}
                        */
