import React, { PropTypes, Component } from 'react';

class Attendees extends Component {

  render() {
    const people = this.props.people.map((person, idx) => {
      return <Person key={ idx } { ...person } />;
    });

    return (
      <div className="ui attendees">
        { people }
      </div>
    );
  }

}

Attendees.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    initials: PropTypes.string
  })).isRequired
};



class Person extends Component {

  render() {
    const { initials, name } = this.props;
    return (
      <div className="ui person">
        <span className="initials">{ initials }</span>
        { name }
      </div>
    );
  }

}
Person.propTypes = {
  name: PropTypes.string,
  initials: PropTypes.string
};



export default Attendees;
