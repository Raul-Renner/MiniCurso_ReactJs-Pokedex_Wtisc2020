import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Home from '../src/components/Home';
import Pokedex from '../src/components/pokedex/Pokedex';
import Pokeball from './components/pokeball/Pokeball';
import PokeArena from './components/pokeArena/PokeArena';
import PokemonInfo from './components/pokemonInfo/pokemonInfo';
export default class App extends Component {
  constructor(props){
    super(props);
    sessionStorage.setItem('url','https://pokeapi.co/api/v2/pokemon');
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Pokemo WITSC</Link>
            <div className="collapse navbar-collapse" id="navabarSuportedContent">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link">Home</Link></li>
                <li><Link to={'/pokedex'} className="nav-link">Pokedex</Link></li>
                <li><Link to={'/pokeball'} className="nav-link">Pokeball</Link></li>
                <li><Link to={'/pokeArena'} className="nav-link">PokeArena</Link></li>

              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/pokedex' component={Pokedex}/>
            <Route path='/pokeball' component={Pokeball}/>
            <Route path='/pokeArena' component={PokeArena}/>
            <Route path='/pokeInfo/:pokeId' component={PokemonInfo}/>



          </Switch>
        </div>

      </BrowserRouter>
    )
  }

}