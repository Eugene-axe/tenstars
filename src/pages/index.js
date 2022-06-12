import React, { useState } from 'react';
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
import { ME } from '../client/query';
import { SET_USER } from '../client/cache';

const PrivateRoute = ({ component: Component, condition, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        condition === true ? (
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
  const [condition, setCondition] = useState(!!localStorage.getItem('token'));
  const { data } = useQuery(ME, {
    onCompleted: () => {
      setCondition(true);
    },
    onError: error => {
      localStorage.removeItem('token');
      setCondition(false);
    }
  });


  return (
    <Router>
      <Switch>
        <Route
          path="/signin"
          render={props => <SignIn setCondition={setCondition} {...props} />}
        />
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
          <PrivateRoute path="/my" component={MyThings} condition={condition} />
          <PrivateRoute
            path="/new"
            component={NewThing}
            condition={condition}
          />
          <PrivateRoute
            path="/edit/:id"
            component={EditThing}
            condition={condition}
          />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Pages;
