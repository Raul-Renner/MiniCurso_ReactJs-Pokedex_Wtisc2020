import React, { Component } from 'react';

export default class PokeballTableRow extends Component {

    getPokemonByUrl(url) {
        var tokens = url.split('/');
        return tokens[tokens.length - 2];
    }

    removerPokemonPokeball(id){
        let pokeball = JSON.parse(sessionStorage.getItem('pokeball'))

        if(!pokeball){
            pokeball = []
        }
        for( let index = 0; index < pokeball.length; index++){
            const element = pokeball[index];

            if(id === element.id){
                pokeball.splice(index, 1);
                sessionStorage.setItem('pokeball', JSON.stringify(pokeball));
                alert('Pokémon removido com sucesso!');
                window.location.reload();
                return;
            }
        }

        alert('Pokemon nao está na pokeball!');

        

        
    }

    render() {

        var imgUrlPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`;

        return (
            <tr>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>{this.props.id}</td>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>
                    <strong>
                        <span style={{ textTransform: 'capitalize' }}>
                            {this.props.nome}
                        </span>
                    </strong>
                </td>
                <td style={{textAlign:'center', verticalAlign:'middle'}}>
                    <img src={imgUrlPokemon} alt={this.props.nome} />
                </td>

                <td>
                    <button type="submit" className="btn btn-danger btn_rmv_pokemonPokeball" 
                    onClick={() => this.removerPokemonPokeball(this.props.id)}>
                        Remover
                    </button>
                </td>
              
            </tr>
        )
    }
}