import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import LogInPage from './containers/LogIn';
import MovieListPage from './containers/MovieList';
import { getAuthToken } from './shared/storage-helper';


const ProtectedRoute = ({
  token,
  ...props
}) => (token ? <Route {...props} /> : <Redirect to="/auth/login" />);

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
  const token = getAuthToken();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MovieListPage} />
        <Route path="/auth" component={AuthRoutes} />
        <ProtectedRoute token={token} path="/admin" render={props => <MovieListPage {...props} isAdminRoute />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
