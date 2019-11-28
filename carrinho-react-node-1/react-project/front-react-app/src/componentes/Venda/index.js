import React, { Component } from "react";
import * as rest from "../../Data/rest";
import { Button, Table, Col } from "reactstrap";
import { FaEye } from "react-icons/fa";
import { ModalVisualizarItemsCompra } from "../Modal";

export class Venda extends Component {
  constructor() {
    super();
    this.state = {
      vendas: [],
      estadoModalVerItemsCompra:false,
      itemsVendas:[]
    };
  }

  componentDidMount() {
    rest.mostrarTodos("vendas").then(vendas => {
      this.setState({vendas});
    });
  }


  mostrarModal = () =>{
    this.setState({estadoModalVerItemsCompra: !this.state.estadoModalVerItemsCompra})
  }

  async mostrarVendaPeloId(id) {
    const resposta = await fetch(`http://localhost:8081/produtovenda=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });
  const json = await resposta.json();
  this.mostrarModal();
  this.setState({itemsVendas:json});
  }

  render() {
    var items = this.state.vendas;
    return (
      <Col>
        <Table striped className="estilo-tabela">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID_VENDA</th>
              <th>ID_VENDEDOR</th>
              <th>DATA</th>
              <th>TOTAL</th>
              <th>Visualizar</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id_venda}>
                <td>
                  <h6>{item.id_venda}</h6>
                </td>
                <td>
                  <h6>{item.id_vendedor}</h6>
                </td>
                <td>
                  <h6>{item.data.substring(0,10)}</h6>
                </td>
                <td>
                  <h6>{item.total}</h6>
                </td>
                <td> <Button
                  color="primary"
                  onClick={event =>
                    this.mostrarVendaPeloId(item.id_venda)
                  }
                  size="sm"
                ><FaEye></FaEye></Button> </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ModalVisualizarItemsCompra itemsVendas={this.state.itemsVendas} mostrarModal={this.mostrarModal} estadoModalVerItemsCompra={this.state.estadoModalVerItemsCompra} />
      </Col>
    );
  }
}
