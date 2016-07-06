import React, { PropTypes, Component } from 'react';
import { GMAPS_ENDPOINT, GMAPS_AUTH_PARAMS } from '../3rdParty';

class Minimap extends Component {

  render() {
    const { lat, lng } = this.props;
    const url = `${GMAPS_ENDPOINT}place?q=${lat}%2C${lng}&${GMAPS_AUTH_PARAMS}`;

    return (
      <div>
        <iframe width="400" height="250" src={ url } frameBorder="0" style={{ 'border': 0 }}></iframe>
      </div>
    );
  }

}

Minimap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};

export default Minimap;
