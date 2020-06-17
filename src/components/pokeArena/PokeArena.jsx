import React, { Component } from 'react';
import "./PokeArena.css";
import PokeArenaRow from '../pokeArena/PokeArenaRow';

const delay = (ms) => new Promise(response => setTimeout(response, ms));

export default class PokeArena extends Component {

    constructor(props) {
        super(props);
        let equipeRocket = [
            { id: 24, nome: 'arbok', life: 100 },
            { id: 52, nome: 'meowth', life: 100 },
            { id: 110, nome: 'weezing', life: 100 },
            { id: 20, nome: 'raticate', life: 100 },
        ]

        this.state = {
            pokeball: [],
            desafiadores: equipeRocket,
            escolhido: 0,
            desafiante: 0,
            mensagem: '',
            atacarBtnDisabled: false
        }

        this.mudarEscolhido = this.mudarEscolhido.bind(this);
    }

    componentDidMount() {
        const pokeball = JSON.parse(sessionStorage.getItem('pokeball'));
        this.setState({ pokeball: pokeball })
        this.setState({ mensagem: 'A batalha vai começar!' })
    }

    mudarEscolhido(index) {
        this.setState({ escolhido: index });
    }


    async atacar() {

        this.setState({ atacarBtnDisabled: true });

        let escolhido = this.state.pokeball[this.state.escolhido];
        let desafiante = this.state.desafiadores[this.state.desafiante];

        this.setState({ mensagem: `${escolhido.nome} atacou! 20 de dano!` });
        await delay(2000);

        desafiante.life = (desafiante.life - 20 < 0) ? 0 : desafiante.life - 20;

        if (desafiante.life === 0) {
            this.setState({ mensagem: `${desafiante.nome} desmaiou! ` });
            await delay(2000);

            const index = this.proximoDesafiante();

            if (index > 0) {
                this.setState({ desafiante: index });
                desafiante = this.state.desafiadores[this.state.desafiante];

                this.setState({ mensagem: `${desafiante.nome} tomou seu lugar!` });
                await delay(2000);


            } else {
                this.setState({ mensagem: 'Você venceu a batalha!' });
                await delay(2000);
                this.reiniciarDesafiante();
                this.setState({ mensagem: 'partida reiniciada!' });
                await delay(2000);

            }
        }
        this.setState({ atacarBtnDisabled: false });
    }

    proximoDesafiante() {
        let desafiantes = this.state.desafiadores;

        for (let index = 0; index < desafiantes.length; index++) {
            const desafiante = desafiantes[index];

            if (desafiante.life > 0) return index;

        }

        return -1;
    }

    reiniciarDesafiante() {
        let desafiantes = this.state.desafiadores;

        for (let index = 0; index < desafiantes.length; index++) {
            const desafiante = desafiantes[index];
            desafiante.life = 100;

        }

        this.setState({ desafiante: 0 });

    }

    renderizarPokeball() {
        return this.state.pokeball.map(
            (pokemon, i) => {
                return <PokeArenaRow
                    id={pokemon.id}
                    mudarEscolhido={this.mudarEscolhido}
                    index={i}
                    jogador = {true}
                />
            }
        )
    }
    renderizarDesafiante() {
        return this.state.desafiadores.map(
            (pokemon, id) => {
                return <PokeArenaRow
                    id={pokemon.id}
                    life = {pokemon.life}
                />
            }
        )
    }

    renderizarArena() {
        if (!this.state.pokeball || this.state.pokeball.length === 0) return

        let escolhido = this.state.pokeball[this.state.escolhido];
        let desafiante = this.state.desafiadores[this.state.desafiante];

        const imgURLDesafiante =
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${desafiante.id}.png`;

        const imgURLEscolhido
            = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${escolhido.id}.png`;

        return (
            <>
                <div className="row background-arena">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 text-right">
                                <span className="life_pokemon">
                                    <b>{desafiante.nome} ({desafiante.life} / 100)</b>

                                </span>
                                <img src={imgURLDesafiante} alt={desafiante.id} srcset="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-left">

                                <img src={imgURLEscolhido} alt={escolhido.id} srcset="" />
                                <span className="life_pokemon">
                                    <b>{escolhido.nome} ({escolhido.life} / 100)</b>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center space_btn_atack">
                        <button className='btn btn-secondary' onClick={() => this.atacar()}
                            disabled={this.state.atacarBtnDisabled}>Atacar</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 alert alert-warning space_mensage" role="alert">
                        {this.state.mensagem}
                    </div>
                </div>

            </>
        )

    }

    render() {
        return (
            <div className="layout_pokeArena" >
                <h3>Batalha de Pokémon</h3>

                <div className="container container-battle">
                    <div className="row">
                        <div className="col-2 oponentes">
                            {this.renderizarPokeball()}
                        </div>
                        <div className="col-8 space_fight">
                            {this.renderizarArena()}
                        </div>
                        <div className="col-2 oponentes">
                            {this.renderizarDesafiante()}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}