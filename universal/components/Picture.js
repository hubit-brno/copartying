import React, { PropTypes, Component } from 'react';

class Picture extends Component {

  render() {
    return (
      <div>
        <img src={ this.props.url } width="100%"/>
      </div>
    );
  }

}

Picture.propTypes = {
  url: PropTypes.string.isRequired
};

Picture.defaultProps = {
  url: 'https://placekitten.com/g/640/300'
}

export default Picture;
