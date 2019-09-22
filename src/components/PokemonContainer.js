import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PokeList from './PokeList';
import Poke from './Poke';
import ErrorNotFound from './ErrorNotFound';

class PokemonContainer extends Component {
   render() {
      return (
         <div className="container">
            <Switch>
                {/* Removed the keyword exact from both of the following Routes to get it to work? */}
               <Route path="/pokemon/page/:page" component={PokeList} />
               <Route path="/pokemon/:id" component={Poke} />
               <Route component={ErrorNotFound} /> 
               
            </Switch>
         </div>
      );
   }
}

export default PokemonContainer;
