import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import "./style.css";
import { FaCartPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

export class MostrarProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editaVel: {},
      defaultDescricao: "",
      defaultPreco: "",
      defaultId: "",
      indexEditado: ""
    };
  }

  render() {
   var items = this.props.filtroProdutos;

    return (
      <Table striped className="estilo-tabela">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>DESCRICAO</th>
            <th>PRECO</th>
            <th>ACAO</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id_produto}>
              <td>
                <h6>{item.id_produto}</h6>
              </td>
              <td>
                <h6>{item.descricao}</h6>
              </td>
              <td>
                <h6>{item.preco}</h6>
              </td>
              <td>
                <Button
                  color="info"
                  onClick={event =>
                    this.props.eventoEditarProduto({
                      id_produto: item.id_produto,
                      descricao: item.descricao,
                      preco: item.preco,
                      quantidade:item.quantidade,
                      index
                    })
                  }
                  size="sm"
                >
                  <FaEdit />
                </Button>{" "}
                <Button
                  color="danger"
                  onClick={event =>
                    this.props.eventoRemoveProduto(item.id_produto, index)
                  }
                  size="sm"
                >
                  <FaTrashAlt />
                </Button>{" "}
                <Button
                  color="success"
                  onClick={event =>
                    this.props.eventoAddCarrinho(event, {
                      id_produto:item.id_produto,
                      descricao: item.descricao,
                      preco: item.preco,
                      quantidade: 0,
                      precoTotal: item.preco
                    })
                  }
                  size="sm"
                >
                  <FaCartPlus />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
