import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import LogInPage from './containers/LogIn';
import MovieListPage from './containers/MovieList';

const AuthRoutes = () => (
  <Switch>
    <Route
      exact
      path="/auth/login"
      component={LogInPage}
    />
    <Redirect to="/auth/login" />
  </Switch>
);

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MovieListPage} />
        <Route path="/auth" component={AuthRoutes} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
