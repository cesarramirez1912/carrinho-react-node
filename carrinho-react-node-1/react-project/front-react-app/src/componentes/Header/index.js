import './style.css';
import React,{Component} from 'react';


export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        return (
            <nav className="navbar nav-bar-expand header">
                <h2 className="text-light">{this.props.title}</h2>
                <h2 className="text-light">{this.props.itensCarrinho}</h2>
             </nav>
          );
    }
}