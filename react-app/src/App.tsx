import './App.css'
import Login from './views/login/Login'
import Register from './views/register/Register'
import Dashboard from './views/dashboard/Dashboard'
import { Router, Switch, Route } from 'react-router-dom'
import history from './services/history'
import PopularMovies from './views/popularMovies/PopularMovies'
import NewMovies from './views/newMovies/NewMovies'

function App() {

  return (
    <>
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/filmes" component={Dashboard} />
          <Route path="/populares" component={PopularMovies} />
          <Route path="/novos" component={NewMovies} />
        </Switch>
      </Router>
    </div>
    </>
  )
}

export default App
