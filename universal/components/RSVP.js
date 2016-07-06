import React, { PropTypes, Component } from 'react';

class RSVP extends Component {

  constructor(props) {
    super(props);

    this.handlers = {
      decline: this.props.onNotGoing.bind(this),
      accept: this.props.onAccepted.bind(this)
    };
  }

  renderDecline() {
    if (this.props.placesLeft > 0) {
      return <button onClick={ this.handlers.decline }>Nedojdu</button>;
    }
  }

  renderAccept() {
    const { placesLeft, shouldHurry } = this.props;

    if (placesLeft === 0) {
      return (
        <div>
          <button disabled>Bohužel, už není místo</button>
          <br/>
          <a href="/">Naplánovat vlastní akci</a>
        </div>
      );
    }

    const accept = this.handlers.accept;

    if (shouldHurry) {
      return <button onClick={ accept }>Pospěš, zbývá už jen { placesLeft } míst</button>;
    } else {
      return <button onClick={ accept }>Jdu!</button>;
    }
  }

  render() {
    return (
      <div>
        { this.renderDecline() }
        { this.renderAccept() }
      </div>
    );
  }

}

RSVP.propTypes = {
  onNotGoing: PropTypes.func.isRequired,
  onAccepted: PropTypes.func.isRequired,
  placesLeft: PropTypes.number,
  shouldHurry: PropTypes.bool
};

RSVP.defaultProps = {
  placesLeft: 0
}

export default RSVP;
