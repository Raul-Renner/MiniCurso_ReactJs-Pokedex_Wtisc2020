import React, { Component } from 'react';

import './Pokedex.css';

import PokedexTableRow from '../pokedex/PokedexTableRow';

import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';


export default class Pokedex extends Component {

    constructor(propiedade) {
        super(propiedade);
        this.state = { count: 0, next: '', previous: '', pokemons: [], loading: true }
    }

    componentDidMount() {
        const url = sessionStorage.getItem('url');
        this.getPokemonData(url);
    }


    getPokemonData(url) {
        this.setState({loading: true})
        sessionStorage.setItem('url', url);
        axios.get(url)
            .then((response) => {
                this.setState(
                    {
                        count: response.data.count,
                        next: response.data.next,
                        previous: response.data.previous,
                        pokemons: response.data.results,
                        loading: false
                    }

                )
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    anterior() {
        if (this.state.previous) {
            this.getPokemonData(this.state.previous);
        }
    }

    proximo() {
        if (this.state.next) {
            this.getPokemonData(this.state.next);
        }
    }
    povoarTabela() {
        if (!this.state.pokemons) return
        return this.state.pokemons.map(
            (elemento, i) => {
                return (
                    <PokedexTableRow
                        pokemon={elemento}
                        key={i}
                    />
                )
            }
        )
    }

    renderizarConteudo() {
        if (this.state.loading) {
            return (
                <tbody>
                    <tr>
                        <td colSpan='4' className = "efeitoLoading">
                            <Spinner animation='border' />
                            Loading...
                        </td>
                    </tr>
                </tbody>
            )
        }
        return (
        <>    
            <tbody>
                {this.povoarTabela()}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan='4' className="td_btn_navegation">
                        <button className="btn btn-secondary btn_navegation" 
                            onClick={() => this.anterior()} disabled={!this.state.previous}>
                            Anterior
                    </button>
                        <button className="btn btn-secondary btn_navegation"
                            onClick={() => this.proximo()} disabled={!this.state.next}>
                            Próximo
                    </button>
                    </td>
                </tr>

            </tfoot>
        </>    
        )
    }

    render() {
        return (
            <div style={{
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <h1>Pokédex</h1> ({this.state.count})
                <table className="table table-striped table-sm table-bordered"
                    >
                    <thead className="thead-dark">
                        <tr>
                            <th className="title_column_th">ID</th>
                            <th className="title_column_th">Nome</th>
                            <th colSpan="2"></th>
                        </tr>
                    </thead>
                    {this.renderizarConteudo()}
                </table>
            </div>
        )
    }
}