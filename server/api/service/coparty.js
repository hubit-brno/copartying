import r from 'rethinkdb';
import config from 'config';
import xss from 'xss';

function connect() {
  return r.connect(config.get('rethinkdb'));
}

export function liveUpdates(io) {
  console.log('Setting up listener...');
  connect()
  .then(conn => {
    r
    .table('coparties')
    .changes().run(conn, (err, cursor) => {
      console.log('Listening for changes...');
      cursor.each((err, change) => {
        console.log('Change detected', change);
        io.emit('coparties-change', change);
      });
    });
  });
}

export function getCoparties() {
  return connect()
  .then(conn => {
    return r
    .table('coparties')
    .orderBy(r.desc('createdAt')).run(conn)
    .then(cursor => cursor);
  });
}

export function getCoparty(id) {
  return connect()
  .then(conn => {
    return r
    .table('coparties')
    .get(id).merge(function(row) {
      return {
        items: row('items').merge(function(item){
      		var sums = row('guests').fold(0, function(sum, curr) {
            var guestItem = curr('items').filter({id: item('id')})(0).default({amount: 0});
            return sum.add(guestItem('amount'));
        	});
          return item.merge({reservedAmount: sums});
        }
      )};
    }).run(conn)
    .then(cursor => {
      return cursor;
    });
  });
}

export function createCoparty(coparty) {
  return connect()
  .then(conn => {
    coparty.createdAt = new Date();
    return r
    .table('coparties')
    .insert(coparty).run(conn)
    .then(response => {
      return Object.assign({}, coparty, {id: response.generated_keys[0]});
    });
  });
}

export function updateCoparty(id, coparty) {
  return connect()
  .then(conn => {
    delete coparty['id'];
    delete coparty['createdAt'];
    delete coparty['adminHash'];
    delete coparty['guests'];
    coparty.updatedAt = new Date();
    return r
    .table('coparties')
    .get(id).update(coparty).run(conn)
    .then(() => {return getCoparty(id);})
    .then((coparty) => coparty);
  });
}

export function createGuest(copartyId, guest) {
  return connect()
  .then(conn => {
    return r
    .table('coparties')
    .get(copartyId).update((row) => {
      var guests = row('guests');
      var currentGuest = guests
        .filter(function(g) {
          return g('email').eq(guest.email);
        })(0).default({email: false});
      var otherGuests = guests
        .default([])
        .filter(function(g) {
          return g('email').ne(guest.email);
        });

      return {guests: r.branch(
        currentGuest('email').eq(guest.email),
        guests,
        otherGuests.append(guest)
      )};

    }).run(conn)
    .then(() => {return getCoparty(copartyId);})
    .then((coparty) => coparty);
  });
}
