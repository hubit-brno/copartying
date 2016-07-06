import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CopartyingApp from './containers/CopartyingApp';

const NoMatch = () => {
	return (
		<div>URL Not found. Check the router config.</div>
	);
};

export default (
  <Route path="/" component={ CopartyingApp }>
    <Route path="*" component={ NoMatch }/>
  </Route>
);