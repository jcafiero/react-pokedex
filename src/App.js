/*
 * Author: Jennifer Cafiero
 * Date: March 6, 2019
 * App.js - Assignment 3
 * Pledge: I pledge my honor that I have abided by the Stevens Honor System
 */
import React, { Component } from 'react';
import logo from './img/poke.svg';
import './App.css';
import PokemonContainer from './components/PokemonContainer';
import BerryContainer from './components/BerryContainer';
import MachineContainer from './components/MachineContainer';
import ErrorNotFound from './components/ErrorNotFound';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to my Pokedex!</h1>
            {/* Adding target="_self" to the following Links allows the Links to go back to
                page 0 every time they are clicked on */}
            <Link className="showlink" to="/pokemon/page/0" target="_self">
              Pokemon
            </Link>
            <Link className="showlink" to="/berries/page/0" target="_self">
              Berries
            </Link>
            <Link className="showlink" to="/machines/page/0" target="_self">
              Machines
            </Link>
          </header>
          <br />
          <br />
          <div className="App-body">
            <p>Pokémon are creatures of all shapes and sizes who live in the wild or alongside humans.  Pokémon are raised and commanded by their owners (called “Trainers”). During their adventures, Pokémon grow and become more experienced and even, on occasion, evolve into stronger Pokémon. (Source: Pokémon.com Parent's Guide)</p>
            <p>Berries are small, juicy, fleshy fruit that can be fed to Pokémon to improve their HP or status condition. Machines include Technical and Hidden Machines and are used to teach your Pokémon new moves.</p>
            <p>This Pokédex can be used as a reference guide for anybody on their journey to become a Pokémon master! Check out the different pages available by clicking on one of the buttons above.</p>
            <Route path="/pokemon/" component={PokemonContainer} />
            <Route path="/berries/" component={BerryContainer} />
            <Route path="/machines/" component={MachineContainer} />
            <Route path="/404" component={ErrorNotFound} />
          </div>
          <br />
        </div>
      </Router>
    );
  }
}

export default App;
