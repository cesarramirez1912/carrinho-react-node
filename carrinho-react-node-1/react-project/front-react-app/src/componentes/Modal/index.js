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
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import * as rest from "../../Data/rest";

export class ModalCarrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      vendedores: [],
      dropdownOpen: false,
      precoTotalVar:0,
      vendedor:{
        id_vendedor:'',
        nome:''
      },
    };
    this.toggle = this.toggle.bind(this)
  }

  async componentDidMount() {
    var resposta = await fetch(`http://localhost:8081/vendedores`);
    var json = await resposta.json();
    this.setState({
      vendedores: json,
      vendedor:{
        id_vendedor:json[0].id_vendedor,
        nome:json[0].nome
      },
      produtos: this.props.itensCarrinho
    });
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

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  trocarVendedor = (e,vendedor) =>{
    e.preventDefault();
    this.setState({
      vendedor:{
        id_vendedor:vendedor.id_vendedor,
        nome:vendedor.nome
      }
    })
  }

  removerProdutoCarrinho = (e, index) => {
    let newState = Object.assign(this.state);
    newState.produtos.splice(index, 1);
    this.props.totalCarrinho(this.state.produtos.length);
    this.setState(newState);
  };

  async criarNovaVenda (event){
    event.preventDefault();
    var texto = document.getElementById('precototal').textContent;
    var textoCortado = texto.substring(3,texto.length)
    let textoParaFloat = parseFloat(textoCortado);
    var objeto = {
      "total":textoParaFloat,
      "id_vendedor":this.state.vendedor.id_vendedor
    }
    var respostaInserido = await fetch('http://localhost:8081/novavenda', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objeto)
    });
    const json = await respostaInserido.json();
    console.log(json)
    console.log(this.state.produtos)
  }

  render() {
    var itens = this.state.produtos;
    let precoTotalVar = 0;
    itens.forEach(elemento => {
       precoTotalVar = +precoTotalVar + +elemento.precoTotal;
    });
    return (
      <div>
        <Modal isOpen={this.props.controle} className="modal-lg">
          <ModalHeader>
            <Col>
              <Row className="d-flex justify-content-between">
                Deseja finalizar a compra?
              </Row>
            </Col>
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
                    <h4 id='precototal'>R$ {precoTotalVar.toFixed(2)}</h4>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
          <Dropdown isOpen={this.state.dropdownOpen} onClick={this.toggle}>
                <DropdownToggle caret>{this.state.vendedor.nome}</DropdownToggle>
                <DropdownMenu>
                  {this.state.vendedores.map(vendedor => (
                    <DropdownItem onClick={(event)=>this.trocarVendedor(event,vendedor)}>
                      {vendedor.nome}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            <Button color="success" onClick={event=>this.criarNovaVenda(event)}>
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
      id_produto:-1,
      descricao: this.props.controle.inputDefaultDescricao,
      preco: this.props.controle.inputDefaultPreco,
      quantidade: this.props.controle.inputDefaultQuantidade
    };
    rest.inserirNovo(objetoProduto, "novoproduto").then(respostaInserir => {
      if (respostaInserir.status === 200) {
        respostaInserir.json().then(json => {
          var produto = {
            id_produto: json[0][0].ultimo_id,
            descricao: this.props.controle.inputDefaultDescricao,
            preco: this.props.controle.inputDefaultPreco,
            quantidade: this.props.controle.inputQuantidade
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
      preco: this.props.controle.inputDefaultPreco,
      quantidade:this.props.controle.inputDefaultQuantidade
    };
    rest.inserirNovo(objetoEditarProduto, "novoproduto").then(respostaEditar => {
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
                        defaultValue={this.props.controle.inputDefaultQuantidade}
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
    rest
      .inserirNovo(objetoFuncionario, "novofuncionario")
      .then(respostaInserir => {
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

  clickEdit = () => {
    var objetoEditarFuncionario = {
      id_vendedor: this.props.variaveis.inputDefaultId,
      nome: this.props.variaveis.inputDefaultNome,
      salario: this.props.variaveis.inputDefaultSalario,
      cargo: this.props.variaveis.inputDefaultCargo
    };
    console.log(objetoEditarFuncionario);
    rest
      .editarObjeto(objetoEditarFuncionario, "updatefuncionario")
      .then(respostaEditar => {
        if (respostaEditar.status === 200) {
          this.props.eventoProdutoEditadoPronto(objetoEditarFuncionario);
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
    if (this.props.variaveis.estadoBotaoCadastrarEditar !== true) {
      this.props.eventoTrocaBotaoEdicaoCadastro();
    }
    this.props.eventoModalNovoFuncionario();
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
                    <Button
                      onClick={event => this.eventoAddFuncionario(event)}
                      className="w-100 mt-3 bg-success"
                    >
                      Cadastrar
                    </Button>
                  ) : (
                    <Button
                      onClick={this.clickEdit}
                      className="w-100 mt-3 bg-info"
                    >
                      Atualizar
                    </Button>
                  )}
                </form>
              </Col>
            </Row>
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
