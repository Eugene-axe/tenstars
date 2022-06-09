import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Layout from '../components/Layout';
import Home from './home';
import Category from './category';
import MyThings from './mythings';
import SignIn from './signin';
import SignUp from './signup';
import NewThing from './newThing';
import ThingPage from './thing';
import EditThing from './editThing';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../client/query';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Somithing errorki with PrivateRouter</p>;
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Pages = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Layout>
          <Route
            path={['/', `/category/${process.env.CAT_ID}`]}
            // path="/"
            exact
            component={Home}
          />
          <Route path="/category/:id" component={Category} />
          <Route path="/thing/:id" component={ThingPage} />
          <PrivateRoute path="/my" component={MyThings} />
          <PrivateRoute path="/new" component={NewThing} />
          <PrivateRoute path="/edit/:id" component={EditThing} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Pages;
