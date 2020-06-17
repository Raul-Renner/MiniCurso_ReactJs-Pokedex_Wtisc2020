import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pokeball.css';
import PokeballTableRow from '../pokeball/PokeballTableRow';

export default class Pokeball extends Component {

    constructor(props){
        super(props)

        this.state = {pokeball: []};
    }


    
    componentDidMount(){
        const pokeball = JSON.parse(sessionStorage.getItem('pokeball'));

        this.setState({pokeball: pokeball});
    }

    povoarTabela(){
        if(!this.state.pokeball || this.state.pokeball.length === 0){
            return (
                <tr>
                    <td colSpan='3' className="td_pokeball">
                        Pokebola vázia.
                    </td>
                </tr>
            )
        }

       
        return this.state.pokeball.map(
            (pokemon,indice) => {
                return <PokeballTableRow
                        nome = {pokemon.nome}
                        id = {pokemon.id}
                        key = {indice}
                    />
            }
        )
    }

    render() {
        return (
            <div className="layout_pokeball">
                <h1>Pokeball</h1>
                <table className="table table-striped table-sm table-bordered table_pokeball">
                    <thead className="thead-dark">
                        <tr>
                            <th className="th_pokeball">ID</th>
                            <th className="th_pokeball">Nome</th>
                            <th colSpan='2'></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.povoarTabela()}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='3' className="td_pokeball">
                                <Link to={'/Pokedex'} className="btn btn-secondary btn_pag_pokedex">
                                    Pokedex
                                </Link>
                            </td>
                        </tr>

                    </tfoot>
                </table>
            </div>
        )
    }
}