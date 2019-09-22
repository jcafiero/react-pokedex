import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BerryList from './BerryList';
import Berry from './Berry';
import ErrorNotFound from './ErrorNotFound';

class BerryContainer extends Component {
   render() {
      return (
         <div className="container">
            <Switch>
                {/* Removed the keyword exact from both of the following Routes to get it to work? */}
               <Route path="/berries/page/:page" component={BerryList} />
               <Route path="/berries/:id" component={Berry} />
               <Route component={ErrorNotFound} /> 
            </Switch>
         </div>
      );
   }
}

export default BerryContainer;
