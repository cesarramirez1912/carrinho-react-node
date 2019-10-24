import './style.css';
import React,{Component} from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { Button} from 'react-bootstrap';

export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        var itensQuantidade = this.props.itensCarrinho;
        return (
            <nav className="navbar nav-bar-expand header">
                <h2 className="text-light">{this.props.title}</h2>
                <Button onClick={event => this.props.mostrarModal()}><h2 className="text-light m-0 p-0"><FaShoppingCart />{' '}{itensQuantidade.length}</h2></Button>
             </nav>
          );
    }
}