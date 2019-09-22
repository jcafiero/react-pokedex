import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Berry extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false,
         hasError: false
      };
   }
   componentWillMount() {
      this.getBerry();
   }
   async getBerry() {
      this.setState({
         loading: true
      });
      try {
         const response = await axios.get(
            `https://pokeapi.co/api/v2/berry/${this.props.match.params.id}`
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
               <h1>Berry</h1>
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
                  {this.state.data && this.state.data.name}
               </h2>
               <br />
               <p>
                  Berry ID: {this.state.data.id}
                  <br />
                  Growth Time: {this.state.data.growth_time}
                  <br />
                  Max Harvest: {this.state.data.max_harvest}
                  <br />
                  Natural Gift Type: {this.state.data.natural_gift_type.name}
                  <br />
                  Natural Gift Power: {this.state.data.natural_gift_power}
                  <br />
                  Size: {this.state.data.size}
                  <br />
                  Firmness: {this.state.data.firmness.name}
               </p>
               <b>Flavors: </b>
               <ul className="list-unstyled">
                    {this.state.data.flavors.map(fl => {
                        if (fl.potency !== 0){ return <li key={fl.flavor.name}>{fl.flavor.name}: {fl.potency}</li> }
                        return null;
                    })}
                </ul>  
            </div>
         );
      }
      return body;
   }
}

export default Berry;
