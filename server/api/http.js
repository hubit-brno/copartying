import * as copartyService from './service/coparty';
import Coparty from './service/copartyObject.js';
import Guest from './service/guestObject.js';

function checkAdminHash(req, coparty) {
  console.log(req.query, coparty);
  let s = req.query.s;
  if (s !== coparty.adminHash) {
    return false;
  }
  return true;
}

export function getCoparties(req, res) {
  copartyService.getCoparties()
  .then((coparties) => {
    return res.json(
      coparties.map(data => new Coparty(data, false).toJson())
    );
  })
  .catch(err => {
    res.status(400);
    res.json({errors: err});
  });
}

export function getCoparty(req, res) {
  copartyService.getCoparty(req.params.id)
  .then((coparty) => {
    coparty = new Coparty(coparty, checkAdminHash(req, coparty));
    res.json(
      { coparty: coparty.toJson(), errors: coparty.getErrors() }
    );
  })
  .catch(err => {
    res.status(400);
    res.json({errors: err});
  });
}

export function createCoparty(req, res) {
  let coparty = new Coparty(req.body.coparty, true);
  if (coparty.validateCoparty()) {
    copartyService.createCoparty(coparty.toJson())
    .then((coparty) => {
      coparty = new Coparty(coparty, true);
      res.json(
        { coparty: coparty.toJson(), errors: coparty.getErrors() }
      );
    })
    .catch(err => {
      res.status(400);
      res.json({errors: err, coparty: req.body});
    });
  } else {
    res.status(400);
    res.json({ coparty: coparty.toJson(), errors: coparty.getErrors() });
  }
}

export function updateCoparty(req, res) {
  let coparty = new Coparty(req.body.coparty, true);
  coparty.set('id', req.params.id);
  if (coparty.validateCoparty()) {
    copartyService.getCoparty(req.params.id)
    .then((oldCoparty) => {
      if (!checkAdminHash(req, oldCoparty)) {
        res.status(401);
        return res.send(401);
      }
      oldCoparty.items.forEach((oit) => {        
        var item = coparty.get('items').find(it => oit.id === it.id);
        if (!item && oit.reservedAmount > 0) {
          throw {items: 'can not remove reserved item'};
          return false;
        }
        if (item && oit.reservedAmount > item.amount) {
          throw {items: 'lack of amount'};
          return false;
        }
      });

      return copartyService.updateCoparty(req.params.id, coparty.toJson());
    })
    .then((coparty) => {
      coparty = new Coparty(coparty, true);
      res.json(
        { coparty: coparty.toJson(), errors: coparty.getErrors() }
      );
    })
    .catch(err => {
      res.status(400);
      res.json({errors: err, coparty: req.body});
    });
  } else {
    res.status(400);
    res.json({ coparty: coparty.toJson(), errors: coparty.getErrors() });
  }
}

export function createGuest(req, res, next) {
  let guest = new Guest(req.body.guest);
  if (guest.validateGuest()) {
    copartyService.getCoparty(req.params.id)
    .then((coparty) => {
      if (coparty.guests.findIndex((it) => it.email === guest.get('email')) > -1) {
        throw {email: 'duplicate value'};
        return false;
      }
      guest.get('items').map((git) => {
        var item = coparty.items.find(it => git.id === it.id);
        if (!item || (item.amount - item.reservedAmount) < git.amount) {
          throw {items: 'lack of amount'};
          return false;
        }
      });
      return true;
    })
    .then(() => {
      return copartyService.createGuest(req.params.id, guest.toJson());
    })
    .then((coparty) => {
      coparty = new Coparty(coparty, false);
      res.json({ coparty: coparty});
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.json({errors: err, guest: req.body.guest});
    });
  } else {
    res.status(400);
    res.json({ guest: guest.toJson(), errors: guest.getErrors() });
  }
}
