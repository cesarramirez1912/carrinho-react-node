import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import {  FaEdit, FaTrashAlt } from "react-icons/fa";

export class MostrarFuncionarios extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  
  render() {
    var items = this.props.funcionarios;
    return (
        <Table striped className="estilo-tabela">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>CARGO</th>
              <th>SALARIO</th>
              <th>ACAO</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id_vendedor}>
                <td>
                  <h6>{item.id_vendedor}</h6>
                </td>
                <td>
                  <h6>{item.nome}</h6>
                </td>
                <td>
                  <h6>{item.cargo}</h6>
                </td>
                <td>
                  <h6>{item.salario}</h6>
                </td>
                <td>
                  <Button color="info" size="sm">
                    <FaEdit />
                  </Button>{" "}
                  <Button color="danger" size="sm">
                    <FaTrashAlt />
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    );
  }
}
