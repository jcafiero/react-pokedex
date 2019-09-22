import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Machine extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false,
         hasError: false
      };
   }
   componentWillMount() {
      this.getMachine();
   }
   async getMachine() {
      this.setState({
         loading: true
      });
      try {
         const response = await axios.get(
            `https://pokeapi.co/api/v2/machine/${this.props.match.params.id}`
         );
        //  console.log(response);
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
               <h1>Machine</h1>
               <br />
               Loading...
            </div>
         );
      } else if (this.state.error) {
        if (this.state.hasError) {
          return <Redirect to='/404/' />
      }
         body = (
            <div>
               <h1>{this.state.error}</h1>
            </div>
         );
      } else {
        if (this.state.hasError) {
          return <Redirect to='/404/' />
      }
         body = (
            <div>
               <h2 className="cap-first-letter">
                  {this.state.data && this.state.data.move.name}
               </h2>
               <br />
               <p>
                  Machine ID: {this.state.data.id}
                  <br />
                  Machine Name: {this.state.data.item.name}
                  <br />
                  Move Name: {this.state.data.move.name}
               </p>
            </div>
         );
      }
      return body;
   }
}

export default Machine;
