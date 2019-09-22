import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MachineList from './MachineList';
import Machine from './Machine';
import ErrorNotFound from './ErrorNotFound';

class MachineContainer extends Component {
   render() {
      return (
         <div className="container">
            <Switch>
                {/* Removed the keyword exact from both of the following Routes to get it to work? */}
               <Route path="/machines/page/:page" component={MachineList} />
               <Route path="/machines/:id" component={Machine} />
               <Route component={ErrorNotFound} />
            </Switch>
         </div>
      );
   }
}

export default MachineContainer;
