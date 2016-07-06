import React, { PropTypes, Component } from 'react';

class Organizer extends Component {

  render() {
    return (
      <div>
        <h2>Organizuje: { this.props.text }</h2>
      </div>
    );
  }

}

Organizer.propTypes = {
  text: PropTypes.string.isRequired
};

export default Organizer;
