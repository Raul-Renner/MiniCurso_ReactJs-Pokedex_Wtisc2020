import React, {Component} from 'react';
import axios from 'axios';
import './pokemonInfo.css';
import '../geral.css';


import {Link} from 'react-router-dom';

export default class pokemonInfo extends Component{

    constructor(props){
        super(props);

        this.state = {
            nome: '',
            altura: '',
            ordem: '',
            peso: '',
            experiencia : ''
        }
    }
    
    componentDidMount(){
        const id = this.props.match.params.pokeId
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
        axios.get(url)

            .then( (response) => {
                this.setState({
                    id:id,
                    nome: response.data.name,
                    altura: response.data.height,
                    ordem: response.data.order,
                    peso: response.data.weight,
                    experiencia: response.data.base_experience
                })
            })
            .catch( (erro) =>{
                console.logo(erro);
            });
    
    }

    render(){
        const urlImgFront =   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.id}.png`;
        const urlImgBack = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${this.state.id}.png`;
        
        return(
            <div clasName="layout_geral">
                <h3>Pokémon Infor</h3>
                <table className="table table-striped table-sm table-bordered table_info">
                    <thead className="thead-dark">
                        <tr>
                            <th className="th_pagInfor"colSpan='2'>
                                <span>
                                {this.state.nome}
                                </span>
                        
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img src={urlImgFront} alt={this.state.id} srcset=""/>
                                <img src={urlImgBack} alt={this.state.id} srcset=""/>
                                
                            </td>
                            <td>
                                <ul>
                                    <li>id: {this.state.id}</li>
                                    <li>nome: {this.state.nome}</li>
                                    <li>altura: {this.state.altura}</li>
                                    <li>ordem: {this.state.ordem}</li>
                                    <li>peso: {this.state.peso}</li>
                                    <li>experiencia: {this.state.experiencia}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='2'className="btn_voltar_pag">
                            <Link to={'/pokedex'} className='btn btn-secondary'>Voltar</Link>
                            </td>
                        </tr>
                    </tfoot>
                </table>


            </div>
        )
    }
}