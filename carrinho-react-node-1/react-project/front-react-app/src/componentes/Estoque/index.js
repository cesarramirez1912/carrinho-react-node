import React, { Component } from "react";
import * as rest from "../../Data/rest";
import { Button, Table, Col } from "reactstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export class Estoque extends Component {
  constructor() {
    super();
    this.state = {
      estoques: []
    };
  }

  componentDidMount() {
    rest.mostrarTodos("estoques").then(estoques => {
      this.setState({ estoques });
    });
  }

  /*funcaoDeTeste() {
    for (var i = 53; i < 60; i++) {
      console.log(i)
      fetch(`http://localhost:8081/novoestoque`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            "id_produto": i,
            "quantidade": 40
        })
      });
    }
  }*/

  render() {
    var items = this.state.estoques;
    return (
      <Col>
        <Table striped className="estilo-tabela">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID_EST</th>
              <th>ID_PROD</th>
              <th>DESCRICAO</th>
              <th>QUANTIDADE</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id_estoque}>
                <td>
                  <h6>{item.id_estoque}</h6>
                </td>
                <td>
                  <h6>{item.id_produto}</h6>
                </td>
                <td>
                  <h6>{item.descricao}</h6>
                </td>
                <td>
                  <h6>{item.quantidade}</h6>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  }
}
