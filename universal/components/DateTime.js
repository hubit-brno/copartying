import React, { PropTypes, Component } from 'react';

class DateTime extends Component {

  render() {
    return (
      <div>
        <h3>Kdy: { this.props.dateTime }</h3>
      </div>
    );
  }

}

DateTime.propTypes = {
  dateTime: PropTypes.string.isRequired
};

export default DateTime;
