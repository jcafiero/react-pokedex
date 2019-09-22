import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import noImage from '../img/download.jpeg';

class Poke extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false,
        //  error: false,
         hasError: false
      };
   }
   componentWillMount() {
      this.getPoke();
   }
   async getPoke() {
      this.setState({
         loading: true
      });
      try {
         const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`
         );
         this.setState({
            data: response.data,
            loading: false
         });
      } catch (e) {
          this.setState({
              hasError: true
          });
         console.log(`error ${e}`);
      }
   }
   render() {
      let body = null;
      if (this.state.loading) {
        if (this.state.hasError) {
           return <Redirect to='/404/' />
        }
         body = (
            <div>
               <h1>Pokemon</h1>
               <br />
               Loading...
            </div>
         );
      } else if (this.state.error) {
        if (this.state.hasError) {
           return <Redirect to='/404' />
        }
         body = (
            <div>
               <h1>{this.state.error}</h1>
            </div>
         );
      } else {
         let img = null;
         if (this.state.data.sprites) {
            img = <img alt="Show" src={this.state.data.sprites.front_default} />;
         } else {
            img = <img alt="Show" src={noImage} />;
         }
         if (this.state.hasError) {
            return <Redirect to='/404' />
         }
         body = (
            <div>
               <h2 className="cap-first-letter">
                  {this.state.data && this.state.data.name}
               </h2>
               {img}
               <br />
               <p>
                  Pokemon ID: {this.state.data.id}
                  <br />
                  Height: {this.state.data.height}
                  <br />
                  Weight: {this.state.data.weight}
                  <br />
                  Order: {this.state.data.order}
                  <br />
                  Base Experience: {this.state.data.base_experience}
               </p>
               <b>Type</b>:
               <ul className="list-unstyled">
                    {this.state.data.types.map(ty => {
                        return <li key={ty.type.name}>{ty.type.name}</li>
                    })}
                </ul>
               <b>Abilities</b>:
               <ul className="list-unstyled">
                  {this.state.data.abilities.map(ab => {
                     return <li key={ab.ability.name}>{ab.ability.name}</li>;
                  })}
               </ul>
               <b>Stats</b>:
               <ul className="list-unstyled">
                  {this.state.data.stats.map(st => {
                      return <li key={st.stat.name}>{st.stat.name}: {st.base_stat}</li>
                  })}
               </ul>
               <b>Moves</b>:
               <ul className="list-unstyled list-inline">
                  {this.state.data.moves.map(mv => {
                     return <li key={mv.move.name}>{mv.move.name}</li>;
                  })}
               </ul>
            </div>
         );
      }
      return body;
   }
}

export default Poke;
