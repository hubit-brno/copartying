import React, { PropTypes, Component } from 'react';

class Foursquare extends Component {

  render() {
    const detail = this.props.detail;

    if (!detail) {
      return <div>Loading</div>;
    }

    const { name, canonicalUrl, photoUrl, location } = detail;

    return (
      <div>
        <h4>
          <a href={ canonicalUrl } target="_blank">{ name }</a>
        </h4>
        <img src={ photoUrl }/>
        <address>
          { location.address }<br/>
          { location.city }<br/>
          geo: { location.lat }, { location.lng }
        </address>
      </div>
    );
  }

}

Foursquare.propTypes = {
  detail: PropTypes.shape({
    name: PropTypes.string,
    canonicalUrl: PropTypes.string,
    photoUrl: PropTypes.string,
    location: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  })
};

export default Foursquare;
