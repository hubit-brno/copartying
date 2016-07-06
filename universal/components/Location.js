import React, { PropTypes, Component } from 'react';

import Foursquare from './Foursquare';
import Minimap from './Minimap';

class Location extends Component {

  // NOTE: depending on how we gonna store the location, we have to adjust this and children components
  // (eventually move it all into one component only, whatever makes more sense)

  render() {
    const { foursquare, minimap } = this.props;
    return (
      <div className="ui location">
        <Foursquare detail={ foursquare }/>
        <Minimap { ...minimap }/>
      </div>
    );
  }

}

Location.propTypes = {
  foursquare: PropTypes.object,
  minimap: PropTypes.object
};

export default Location;
