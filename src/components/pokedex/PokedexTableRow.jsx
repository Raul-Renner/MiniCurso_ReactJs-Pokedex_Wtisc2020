import React, { Component} from 'react';
import './Pokedex.css';
import {Link} from 'react-router-dom';
export default class PokedexTableRow extends Component {

    getPokemonByUrl(url) {
        var tokens = url.split('/');
        return tokens[tokens.length - 2];
    }

    capturar(id, nome){
        
        let pokeball = JSON.parse(sessionStorage.getItem('pokeball'))

        if(!pokeball){
            pokeball = []
        }

        if(pokeball.length === 4){
            alert('Capacidade máxima da Pokebola atingida!')
            return
        }
        for (let index = 0; index < pokeball.length; index++) {
            const element = pokeball[index];
            if(id === element.id){
                alert('Pokemon já capturado!')
                return
            }
        }

        pokeball.push({id,nome,life:100})
        sessionStorage.setItem('pokeball', JSON.stringify(pokeball));
        alert('Pokémon capturado com sucesso!')

    }
    render() {
        const id = this.getPokemonByUrl(this.props.pokemon.url);
        console.log(id);
        var imgUrlPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return (
            <tr>
                <td className="td_btn_navegation">{id}</td>
                <td className="td_btn_navegation">
                    <strong>
                        <span>
                            {this.props.pokemon.name}
                        </span>
                    </strong>
                </td>
                <td className="td_btn_navegation">
                    <img src={imgUrlPokemon} alt={this.props.pokemon.name} />
                </td>
                <td className="td_btn_navegation">
                    <Link className="btn btn-primary btn_navegation" to={`/pokeInfo/${id}`}>Informações</Link>
                    <button className="btn btn-danger btn_navegation"
                         onClick={() => this.capturar(id, this.props.pokemon.name)}>
                        Capturar
                    </button>
                </td>
            </tr>
        )
    }
}