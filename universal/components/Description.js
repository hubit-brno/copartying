import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

class Description extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true
    };

    this.handlers = {
      readMore: this.readMore.bind(this)
    };
  }

  readMore() {
    this.setState({
      isCollapsed: false
    });
  }

  render() {
    const textClasses = classNames('text', {
      collapsed: this.state.isCollapsed
    });

    const button = this.state.isCollapsed ? <button onClick={ this.handlers.readMore }>Číst více</button> : null;

    return (
      <div className="ui description">
        <p className={ textClasses }>{ this.props.text }</p>
        { this.state.isCollapsed }
        { button }
      </div>
    );
  }

}

Description.propTypes = {
  text: PropTypes.string.isRequired
};

export default Description;
