import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Logo from '../components/Logo';
import Picture from '../components/Picture';
import Title from '../components/Title';
import Description from '../components/Description';
import DateTime from '../components/DateTime';
import Location from '../components/Location';
import Organizer from '../components/Organizer';
import Attendees from '../components/Attendees';
import RSVP from '../components/RSVP';


import { loadVenueDetail } from '../actions/FourSquareActions';

class CopartyingApp extends Component {

  componentWillMount() {
    this.props.loadVenueDetail('53d3f607498edfb90a15baf5');
  }

  render() {
    const description = "Celkově již počtvrté se sheffieldští kytaro-drtiči 65daysofstatic vrací do Prahy, tentokráte k nám do MeetFactory, a tentokráte také překvapivě bez nové řadové desky. Nicméně, post-rocková úderka kolem Joea Shrewsburyho a Paula Wolinskeho v létě vydává soundtrack k jedné z nejočekávanějších počítačových indie-her letoška, No Man's Sky. Nicméně, kdo 65dos někdy viděl ví, že nejvíc to klukům sluší stejně na pódiu - na tom našem se představí v úterý 8. listopadu.";

    const locationProps = {
      foursquare: this.props.foursquareDetail,
      minimap: {
        lat: 40.71276077657612,
        lng: -74.01604322035226
      }
    };

    const attendees = [
      {
        name: 'Connie Delgado',
        initials: 'CD'
      },
      {
        name: 'Aaron Brock',
        initials: 'AB'
      },
      {
        name: 'Cameron Goodwin',
        initials: 'CG'
      },
      {
        name: 'Jacob Harper',
        initials: 'JH'
      },
      {
        name: 'Ramiro Buchanan',
        initials: 'RB'
      },
      {
        name: 'Marcella West',
        initials: 'MW'
      },
      {
        name: 'Henry Pena',
        initials: 'HP'
      },
      {
        name: 'June Cummings',
        initials: 'JC'
      },
      {
        name: 'Lorena Adkins',
        initials: 'LA'
      },
      {
        name: 'Debra Rodriquez',
        initials: 'DR'
      }
    ];

    const rsvp = {
      onNotGoing: () => { console.log('nope'); },
      onAccepted: () => { console.log('mmmkey'); },
      placesLeft: 10,
      shouldHurry: false
    };

    return (
      <div style={{ width: '640px' }}>
        <Logo />
        <Picture url="https://placekitten.com/640/300"/>
        <Title text="65daysofstatic (UK)"/>
        <Description text={ description }/>
        <DateTime dateTime="8.11.2016 ve 20:30"/>
        <Location { ...locationProps }/>
        <Organizer text="Impact Hub Brno"/>
        <Attendees people={ attendees }/>
        <RSVP { ...rsvp }/>
      </div>
    );
  }
}

function reduceFoursquareDetail(fullDetail) {
  if (!fullDetail) {
    return null;
  }

  const location = fullDetail.location;
  const bestPhoto = fullDetail.bestPhoto;

  return {
    name: fullDetail.name,
    canonicalUrl: fullDetail.canonicalUrl,
    photoUrl: bestPhoto.prefix + '100x100' + bestPhoto.suffix,
    location: {
      address: location.address,
      city: location.city,
      lat: location.lat,
      lng: location.lng
    }
  };
}

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
  state => ({
    foursquareDetail: reduceFoursquareDetail(state.app.venueDetail)
  }),
  dispatch => bindActionCreators({
    loadVenueDetail
  }, dispatch)
)(CopartyingApp);
