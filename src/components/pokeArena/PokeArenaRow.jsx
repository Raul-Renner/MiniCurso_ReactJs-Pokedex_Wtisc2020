import React, { Component } from 'react';

export default class PokeArenaRow extends Component {

    renderizarPokemon() {
        var imgUrlPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`;

        if (this.props.jogador) {
            return (
                <button className='btn btn-outline-light btn_pokemon_fight'>
                    <img src={imgUrlPokemon} alt={this.props.id} srcset=""
                        onClick={() => this.props.mudarEscolhido(this.props.index)} />
                </button>
            )
        } else {
            const opacity = this.props.life / 100;
            return (
                <img src={imgUrlPokemon} alt={this.props.id} style={{opacity: opacity}} />
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderizarPokemon()}
            </div>
        )
    }
}