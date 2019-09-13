import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import publications from './publications.json';
import Reader from './Reader';

const App = () => {
  return (
    <>
      <Switch>
        <Route
          path="/reader"
          // eslint-disable-next-line react/jsx-props-no-spreading
          render={props => <Reader {...props} items={publications} />}
        />
        <Redirect
          to={{
            pathname: '/reader',
            search: '?item=1',
          }}
        />
      </Switch>
    </>
  );
};

export default App;
