import React, { PropTypes, Component } from 'react';

class Title extends Component {

  render() {
    return (
      <div>
        <h2>{ this.props.text }</h2>
      </div>
    );
  }

}

Title.propTypes = {
  text: PropTypes.string.isRequired
};

export default Title;
